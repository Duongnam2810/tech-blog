/* Ki?m tra chuy?n ??ng Hero v? ??i chi?u v?i phi?n b?n tr??c thay ??i.
 * Uses installed Chrome and the project's existing ws dependency; installs nothing.
 * Run after npm run build: node design/phase-3/verify.cjs
 */
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const {spawn} = require('node:child_process');
const WebSocket = require('ws');
const root = path.resolve(__dirname, '../..');
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const report = {views: [], widths: [], links: [], interactions: {}, errors: []};
let browser, socket, server, sequence = 0;
const pending = new Map();
function command(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => {pending.delete(id); reject(new Error(`Timeout: ${method}`));}, 20000);
    pending.set(id, {resolve, reject, timer});
    socket.send(JSON.stringify({id, method, params}));
  });
}
async function evaluate(expression) {
  const result = await command('Runtime.evaluate', {expression, returnByValue: true, awaitPromise: true});
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function navigate(url) {
  await command('Page.navigate', {url});
  for (let i = 0; i < 100; i++) {
    if (await evaluate(`document.readyState==='complete' && !!document.querySelector('main h1')`)) break;
    await wait(100);
  }
  await evaluate(`Promise.race([document.fonts.ready.then(()=>true),new Promise(r=>setTimeout(()=>r(false),8000))])`);
  await wait(250);
}
const measure = `(() => {
  const main=document.querySelector('main');
  const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}};
  return {
    width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
    height:document.documentElement.scrollHeight,theme:document.documentElement.dataset.theme,
    sections:[...main.querySelectorAll(':scope>section')].map(e=>({id:e.id||'hero',...rect(e)})),
    h1:{text:main.querySelector('h1').textContent,font:getComputedStyle(main.querySelector('h1')).fontSize,...rect(main.querySelector('h1'))},
    headings:[...main.querySelectorAll('h2')].map(e=>({text:e.textContent,font:getComputedStyle(e).fontSize})),
    overflow:[...main.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+1&&getComputedStyle(e).position!=='absolute'}).slice(0,10).map(e=>e.className),
    brokenAnchors:[...main.querySelectorAll('a[href^="#"]')].filter(e=>!document.getElementById(e.hash.slice(1))).map(e=>e.hash),
    imageFailures:[...document.images].filter(e=>!e.complete||e.naturalWidth===0).map(e=>e.src),
    primary:[...main.querySelectorAll('a')].filter(a=>a.textContent.includes('Explore my projects')||a.textContent==='Get in touch').map(a=>({text:a.textContent,...rect(a)})),
    font:document.fonts.check('16px Inter')
  };
})()`;
async function screenshot(filename, width, height) {
  await evaluate(`window.scrollTo({top:0,behavior:'instant'})`);
  const result = await command('Page.captureScreenshot', {format: 'png', captureBeyondViewport: true, clip: {x: 0, y: 0, width, height, scale: 1}});
  fs.writeFileSync(path.join(__dirname, filename), Buffer.from(result.data, 'base64'));
}
async function settleScroll() {
  let previous=-1;
  for(let i=0;i<30;i++) {
    await wait(100);
    const current=await evaluate('window.scrollY');
    if(current===previous) return;
    previous=current;
  }
}
async function main() {
  const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.woff2':'font/woff2'};
  server = http.createServer((req,res) => {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let relative = pathname.startsWith('/tech-blog/') ? 'build/'+pathname.slice('/tech-blog/'.length) : pathname.slice(1);
    let file = path.resolve(root,relative);
    if (!file.startsWith(root+path.sep)) {res.writeHead(403).end();return;}
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file=fs.existsSync(file+'.html') ? file+'.html' : path.join(file,'index.html');
    if (!fs.existsSync(file) && fs.existsSync(file+'.html')) file+='.html';
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {res.writeHead(404).end();return;}
    res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream'});
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin=`http://127.0.0.1:${server.address().port}`;
  const production=origin+'/tech-blog/about';
  const reference=origin+'/design/phase-2/about.html';
  report.route={url:'/tech-blog/about',status:(await fetch(production)).status};
  const profile=fs.mkdtempSync(path.join(os.tmpdir(),'tech-blog-phase3-'));
  browser=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{windowsHide:true,stdio:['ignore','ignore','pipe']});
  const endpoint=await new Promise((resolve,reject)=>{
    let log='';const timer=setTimeout(()=>reject(new Error('Chrome startup timed out: '+log)),20000);
    browser.stderr.on('data',chunk=>{log+=chunk.toString();const match=log.match(/DevTools listening on (ws:\/\/[^\s]+)/);if(match){clearTimeout(timer);resolve(match[1]);}});
    browser.on('error',reject);
  });
  const targets=await (await fetch(new URL(endpoint).origin.replace('ws:','http:')+'/json/list')).json();
  socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise(resolve=>socket.once('open',resolve));
  socket.on('message',buffer=>{
    const message=JSON.parse(buffer.toString());
    if (message.method==='Runtime.exceptionThrown') report.errors.push(message.params.exceptionDetails);
    const p=pending.get(message.id);if(!p)return;
    pending.delete(message.id);clearTimeout(p.timer);
    message.error?p.reject(new Error(JSON.stringify(message.error))):p.resolve(message.result);
  });
  await command('Page.enable');await command('Runtime.enable');

  const baselineMode=process.argv.includes('--baseline');
  const baselineFile=path.join(__dirname,'baseline.json');
  const baseline=fs.existsSync(baselineFile)?JSON.parse(fs.readFileSync(baselineFile,'utf8')):null;
  const q = `(name)=>document.querySelector('[class*="'+name+'_"]')`;
  for(const theme of ['light','dark']) {
    await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'reduce'}]});
    for(const [name,width,height] of [['desktop',1440,1000],['tablet',834,1100],['mobile',390,844]]) {
      await command('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
      await navigate(production);
      const geometry=await evaluate(`(()=>{const q=${q};const rect=e=>{const r=e.getBoundingClientRect();return {width:r.width,height:r.height}};return {hero:rect(q('hero')),frame:rect(q('identity-frame')),monogram:rect(q('monogram')),nameFont:getComputedStyle(document.querySelector('main h1')).fontSize,sections:document.querySelectorAll('main>section').length,overflow:document.documentElement.scrollWidth>innerWidth,otherSections:[...document.querySelectorAll('main>section')].slice(1).map(e=>e.innerHTML),animations:document.querySelector('main').getAnimations({subtree:true}).filter(a=>a.playState==='running').length}})()`);
      const original=baseline?.views.find(v=>v.name===name&&v.theme===theme);
      report.views.push({name,theme,...geometry,frameMatches:original?JSON.stringify(original.frame)===JSON.stringify(geometry.frame):null,typographyMatches:original?original.nameFont===geometry.nameFont:null,otherSectionsUnchanged:original?JSON.stringify(original.otherSections)===JSON.stringify(geometry.otherSections):null});
      await screenshot(`${baselineMode?'before':'after'}-${name}-${theme}.png`,width,height);
    }
  }
  if(baselineMode) {
    fs.writeFileSync(baselineFile,JSON.stringify(report,null,2));
    console.log('?? l?u h?nh v? s? ?o Hero tr??c thay ??i.');
    return;
  }
  await command('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:'light'},{name:'prefers-reduced-motion',value:'no-preference'}]});
  await navigate(production);await wait(1000);
  report.interactions.motion=await evaluate(`(()=>{const q=${q};return {active:q('hero').dataset.motionActive,animations:document.querySelector('main').getAnimations({subtree:true}).map(a=>({name:a.animationName,state:a.playState,duration:a.effect.getTiming().duration,iterations:String(a.effect.getTiming().iterations)})),dot:getComputedStyle(q('node-one')).offsetDistance,orbit:getComputedStyle(q('orbit-one')).transform}})()`);
  await wait(500);
  report.interactions.orbitAfter=await evaluate(`getComputedStyle((${q})('orbit-one')).transform`);
  report.interactions.dotAfter=await evaluate(`getComputedStyle((${q})('node-one')).offsetDistance`);
  const frame=await evaluate(`(()=>{const r=(${q})('identity-frame').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
  await command('Emulation.setEmulatedMedia',{features:[{name:'hover',value:'hover'},{name:'pointer',value:'fine'}]});
  await command('Input.dispatchMouseEvent',{type:'mouseMoved',x:frame.x,y:frame.y});await wait(300);
  report.interactions.hover=await evaluate(`(()=>{const e=(${q})('identity-frame');return {matches:e.matches(':hover'),shadow:getComputedStyle(e).boxShadow,border:getComputedStyle(e).borderColor,transform:getComputedStyle(e).transform}})()`);
  await evaluate(`(${q})('motion-toggle').click()`);await wait(350);
  report.interactions.pause=await evaluate(`({pressed:(${q})('motion-toggle').getAttribute('aria-pressed'),active:(${q})('hero').dataset.motionActive,running:document.querySelector('main').getAnimations({subtree:true}).filter(a=>a.playState==='running').length,details:document.querySelector('main').getAnimations({subtree:true}).filter(a=>a.playState==='running').map(a=>({name:a.animationName,property:a.transitionProperty}))})`);
  await evaluate(`(${q})('motion-toggle').click();document.getElementById('projects').scrollIntoView({behavior:'instant'})`);await wait(200);
  report.interactions.offscreen=await evaluate(`(${q})('hero').dataset.motionActive`);
  await evaluate(`scrollTo({top:0,behavior:'instant'})`);await wait(200);
  report.interactions.returned=await evaluate(`(${q})('hero').dataset.motionActive`);
  await evaluate(`Object.defineProperty(document,'visibilityState',{configurable:true,value:'hidden'});document.dispatchEvent(new Event('visibilitychange'))`);await wait(100);
  report.interactions.hiddenEvent=await evaluate(`(${q})('hero').dataset.motionActive`);
  await evaluate(`delete document.visibilityState;document.dispatchEvent(new Event('visibilitychange'))`);await wait(100);
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await wait(100);
  report.interactions.reduced=await evaluate(`({running:document.querySelector('main').getAnimations({subtree:true}).filter(a=>a.playState==='running').length,buttonDisplay:getComputedStyle((${q})('motion-toggle')).display,opacity:getComputedStyle(document.querySelector('h1')).opacity,monogramTransform:getComputedStyle((${q})('monogram')).transform})`);
  report.mobileMotion=[];
  for(const theme of ['light','dark']) {
    await command('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
    await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'no-preference'}]});
    await navigate(production);await wait(850);
    report.mobileMotion.push(await evaluate(`(()=>{const q=${q};return {theme:document.documentElement.dataset.theme,scan:getComputedStyle(q('composition'),'::before').content,orbitTwo:getComputedStyle(q('orbit-two')).animationName,orbitOne:getComputedStyle(q('orbit-one')).animationDuration,overflow:document.documentElement.scrollWidth>innerWidth}})()`));
  }
  for(const width of [320,375,576,768,996,1024,1920]) {
    await command('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
    report.widths.push(await evaluate(`({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth})`));
  }
  report.passed=report.views.every(v=>v.frameMatches&&v.typographyMatches&&v.otherSectionsUnchanged&&!v.overflow&&v.animations===0)&&report.widths.every(v=>!v.overflow)&&report.interactions.motion.active==='true'&&report.interactions.motion.orbit!==report.interactions.orbitAfter&&report.interactions.motion.dot!==report.interactions.dotAfter&&report.interactions.hover.matches&&report.interactions.pause.running===0&&report.interactions.pause.pressed==='true'&&report.interactions.offscreen==='false'&&report.interactions.returned==='true'&&report.interactions.hiddenEvent==='false'&&report.interactions.reduced.running===0&&report.mobileMotion.every(v=>v.scan==='none'&&v.orbitTwo==='none'&&v.orbitOne==='40s'&&!v.overflow)&&report.errors.length===0;
  fs.writeFileSync(path.join(__dirname,'validation.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({passed:report.passed,views:report.views.map(({otherSections,...v})=>v),widths:report.widths,mobileMotion:report.mobileMotion,interactions:report.interactions,errors:report.errors},null,2));
  if(!report.passed)process.exitCode=1;
}
main().catch(error=>{console.error(error);process.exitCode=1}).finally(async()=>{
  if(socket?.readyState===1){try{await command('Browser.close')}catch{}}
  socket?.close();browser?.kill();server?.close();
});

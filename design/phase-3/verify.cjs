/* Browser verification of the production build against the frozen Phase 2 study.
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
  for (const theme of ['light','dark']) {
    await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme}]});
    for (const [name,width,height] of [['desktop',1440,1000],['tablet',834,1100],['mobile',390,844]]) {
      await command('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
      await navigate(reference+'?theme='+theme);
      const approved=await evaluate(measure);
      await navigate(production);
      const actual=await evaluate(measure);
      const filename=`${name}-${theme}.png`;
      await screenshot(filename,width,actual.height);
      if(name==='desktop') await screenshot(`hero-${theme}.png`,width,1000);
      const comparison=actual.sections.map((section,index)=>({
        id:section.id,widthDelta:Math.round(section.width-approved.sections[index].width),
        heightDelta:Math.round(section.height-approved.sections[index].height),
      }));
      report.views.push({name,theme,file:filename,...actual,comparison,headingFontsMatch:JSON.stringify(actual.headings)===JSON.stringify(approved.headings)});
    }
  }
  for(const width of [320,375,576,577,768,996,997,1024,1920]) {
    await command('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
    report.widths.push(await evaluate(`({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth})`));
  }
  const links=await evaluate(`[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.href))]`);
  for(const href of links) {
    const target=new URL(href);
    if(target.origin===origin) {
      const response=await fetch(target);
      const body=await response.text();
      const fragment=target.hash.slice(1);
      const escaped=fragment.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      report.links.push({href:target.pathname+target.hash,status:response.status,anchorFound:!fragment||new RegExp('\\bid=(?:"'+escaped+'"|'+escaped+'(?=[\\s>]))').test(body)});
    } else if(target.protocol==='https:') {
      try {const response=await fetch(href,{method:'HEAD',signal:AbortSignal.timeout(10000)});report.links.push({href,status:response.status});}
      catch(error){report.links.push({href,unverified:error.message});}
    }
  }
  await command('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
  await navigate(production);
  await evaluate(`document.querySelector('.navbar__toggle').click()`);
  await wait(300);
  report.interactions.menu=await evaluate(`({expanded:document.querySelector('.navbar__toggle').getAttribute('aria-expanded'),visible:Math.abs(document.querySelector('.navbar-sidebar')?.getBoundingClientRect().left)<1})`);
  await evaluate(`document.querySelector('.navbar-sidebar a[href$="/about"]').click()`);
  await wait(300);
  report.interactions.menuLink=await evaluate(`({closed:document.querySelector('.navbar__toggle').getAttribute('aria-expanded')==='false'})`);
  report.interactions.cta=await evaluate(`document.querySelector('main a[href="#projects"]').click();location.hash`);
  await settleScroll();
  report.interactions.ctaTarget=await evaluate(`({hash:location.hash,top:document.getElementById('projects').getBoundingClientRect().top,navbarBottom:document.querySelector('.navbar').getBoundingClientRect().bottom})`);
  await evaluate(`document.querySelector('main a[href="#contact"]').click()`);await settleScroll();
  report.interactions.contact=await evaluate(`({hash:location.hash,top:document.getElementById('contact').getBoundingClientRect().top})`);
  await command('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await navigate(production);
  report.interactions.themeBefore=await evaluate('document.documentElement.dataset.theme');
  const themeStates=[];
  for(let i=0;i<3;i++) {
    await evaluate(`document.querySelector('.navbar__items--right button[title]').click()`);await wait(100);
    themeStates.push(await evaluate(`({theme:document.documentElement.dataset.theme,choice:document.documentElement.dataset.themeChoice})`));
  }
  report.interactions.themeCycle=themeStates;
  const focus=await evaluate(`document.querySelector('main a[href="#projects"]').focus();({active:document.activeElement.textContent,outline:getComputedStyle(document.activeElement).outlineWidth})`);
  report.interactions.focus=focus;
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  report.interactions.reducedMotion=await evaluate(`({scroll:getComputedStyle(document.documentElement).scrollBehavior,transition:getComputedStyle(document.querySelector('main a[href="#projects"]')).transitionDuration})`);
  // Check client navigation and baseUrl as well as the direct server-rendered route.
  await navigate(origin+'/tech-blog/');
  await evaluate(`document.querySelector('.navbar a[href="/tech-blog/about"]').click()`);
  await wait(600);
  report.interactions.clientRoute=await evaluate(`({path:location.pathname,sections:document.querySelectorAll('main>section').length,heading:document.querySelector('main h1')?.textContent})`);
  report.passed=report.route.status===200 && report.views.every(v=>v.sections.length===8&&v.overflow.length===0&&v.brokenAnchors.length===0&&v.imageFailures.length===0&&v.headingFontsMatch&&v.comparison.every(c=>Math.abs(c.widthDelta)<=1&&Math.abs(c.heightDelta)<=1)) && report.widths.every(v=>!v.overflow) && report.links.every(l=>l.status===200&&l.anchorFound!==false) && report.errors.length===0 && report.interactions.menu.expanded==='true' && report.interactions.menu.visible && report.interactions.menuLink.closed && report.interactions.ctaTarget.hash==='#projects' && report.interactions.ctaTarget.top>=report.interactions.ctaTarget.navbarBottom && report.interactions.contact.hash==='#contact' && report.interactions.focus.outline==='3px' && report.interactions.reducedMotion.scroll==='auto' && report.interactions.reducedMotion.transition==='0s' && report.interactions.clientRoute.path==='/tech-blog/about' && report.interactions.clientRoute.sections===8;
  fs.writeFileSync(path.join(__dirname,'validation.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({passed:report.passed,route:report.route,views:report.views.map(v=>({name:v.name,theme:v.theme,headingFontsMatch:v.headingFontsMatch,comparison:v.comparison,overflow:v.overflow})),widths:report.widths,links:report.links,interactions:report.interactions,errors:report.errors},null,2));
  if(!report.passed)process.exitCode=1;
}
main().catch(error=>{console.error(error);process.exitCode=1}).finally(async()=>{
  if(socket?.readyState===1){try{await command('Browser.close')}catch{}}
  socket?.close();browser?.kill();server?.close();
});

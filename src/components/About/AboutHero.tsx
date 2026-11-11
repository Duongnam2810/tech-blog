import {Fragment, useEffect, useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {profile} from '@site/src/data/about';
import {classes, Icon, Lines, Star} from './shared';

export default function AboutHero(): ReactNode {
  const portraitUrl = useBaseUrl(profile.portrait?.src ?? '/');
  const heroRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    let inView = false;
    const update = () => {
      const visible = inView && document.visibilityState === 'visible';
      setActive(visible);
      if (visible) setEntered(true);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(hero);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return <section ref={heroRef} className={classes('hero', 'container', entered && 'motion-ready')} data-motion-active={active && !paused} aria-labelledby="hero-title" lang="vi">
    <div className={classes('hero-copy')}>
      <p className={classes('eyebrow')}><span className={classes('line')} />{profile.eyebrow}</p>
      <p className={classes('greeting')}>{profile.greeting}</p>
      <h1 id="hero-title">{profile.nameLines.map((line, index) => index === profile.nameLines.length - 1
        ? <span key={index}>{line}</span>
        : <Fragment key={index}>{line}{' '}</Fragment>)}</h1>
      <p className={classes('role')}>{profile.role}</p>
      <p className={classes('hero-description')}>{profile.introduction}</p>
      <div className={classes('actions')}>
        <Link to="#projects" className={classes('button', 'primary')}>{profile.projectsLabel}<Icon name="arrow" /></Link>
        <Link to="#contact" className={classes('button', 'secondary')}>{profile.contactLabel}</Link>
      </div>
      <p className={classes('hero-caption')}>{profile.caption}</p>
    </div>
    <figure className={classes('identity')}>
      {profile.portrait ? <div className={classes('identity-frame')}><img className={classes('portrait')} src={portraitUrl} alt={profile.portrait.alt} width="420" height="525" /></div> :
        <div className={classes('identity-frame')} role="group" aria-label={profile.visual.label}>
          <div className={classes('frame-top')}><span>{profile.visual.heading}</span><Star small /></div>
          <div className={classes('composition')} aria-hidden="true">
            <div className={classes('orbit', 'orbit-one')}><div className={classes('orbital-track')}><span className={classes('node', 'node-one')} /></div></div>
            <div className={classes('orbit', 'orbit-two')}><div className={classes('orbital-track')}><span className={classes('node', 'node-two')} /></div></div>
            <div className={classes('axis', 'axis-x')} /><div className={classes('axis', 'axis-y')} />
            <div className={classes('monogram-entry')}><span className={classes('monogram')}>{profile.initials}<span>.</span></span></div>
            <span className={classes('coordinate')}><Lines lines={profile.visual.coordinates} /></span>
            <span className={classes('corner-mark')}>+</span>
          </div>
          <div className={classes('frame-bottom')}><span>{profile.visual.footer}</span>
            <button type="button" className={classes('motion-toggle')} onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? profile.visual.resumeLabel : profile.visual.pauseLabel} title={paused ? profile.visual.resumeLabel : profile.visual.pauseLabel}>
              <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true" focusable="false">{paused ? <path d="m6 4 9 6-9 6Z" /> : <><path d="M6 4v12M14 4v12" /></>}</svg>
            </button>
          </div>
        </div>}
      <figcaption><span>{profile.visual.caption}</span><span>{profile.visual.captionDetail}</span></figcaption>
    </figure>
  </section>;
}

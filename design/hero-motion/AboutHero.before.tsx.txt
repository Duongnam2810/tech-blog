import {Fragment, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {profile} from '@site/src/data/about';
import {classes, Icon, Lines, Star} from './shared';

export default function AboutHero(): ReactNode {
  const portraitUrl = useBaseUrl(profile.portrait?.src ?? '/');
  return <section className={classes('hero', 'container')} aria-labelledby="hero-title">
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
        <div className={classes('identity-frame')} role="img" aria-label={profile.visual.label}>
          <div className={classes('frame-top')}><span>{profile.visual.heading}</span><Star small /></div>
          <div className={classes('composition')} aria-hidden="true">
            <div className={classes('orbit', 'orbit-one')} /><div className={classes('orbit', 'orbit-two')} />
            <div className={classes('axis', 'axis-x')} /><div className={classes('axis', 'axis-y')} />
            <span className={classes('monogram')}>{profile.initials}<span>.</span></span>
            <span className={classes('node', 'node-one')} /><span className={classes('node', 'node-two')} />
            <span className={classes('coordinate')}><Lines lines={profile.visual.coordinates} /></span>
            <span className={classes('corner-mark')}>+</span>
          </div>
          <div className={classes('frame-bottom')}><span>{profile.visual.footer}</span><span aria-hidden="true">↗</span></div>
        </div>}
      <figcaption><span>{profile.visual.caption}</span><span>{profile.visual.captionDetail}</span></figcaption>
    </figure>
  </section>;
}

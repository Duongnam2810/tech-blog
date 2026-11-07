import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {contactLinks, contactNote, sectionCopy} from '@site/src/data/about';
import {classes, SectionTitle} from './shared';

export default function ContactSection(): ReactNode {
  return <section id="contact" className={classes('section', 'container', 'contact', 'split')} aria-labelledby="contact-title">
    <SectionTitle id="contact-title" copy={sectionCopy.contact} description />
    <div className={classes('contact-list')}>{contactLinks.map(contact => <div key={contact.label}>
      <span>{contact.label}</span><span>{contact.url ? <Link to={contact.url}>{contact.value}</Link> : contact.value}</span>
    </div>)}{contactNote && <p className={classes('content-note')}>{contactNote}</p>}</div>
  </section>;
}

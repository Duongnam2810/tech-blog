import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {projects, projectVisuals, sectionCopy, type Project} from '@site/src/data/about';
import {classes, Icon, Lines, SectionHeading, Tags} from './shared';

function ProjectLinks({project}: {project: Project}): ReactNode {
  if (!project.url && !project.sourceUrl) return project.pendingNote ? <p className={classes('project-foot')}>{project.pendingNote}</p> : null;
  return <div className={classes('project-links')}>
    {project.url && <Link to={project.url}>{projectVisuals.visitLabel}<Icon name="arrow" /></Link>}
    {project.sourceUrl && <Link to={project.sourceUrl}>{projectVisuals.sourceLabel}<Icon name="arrow" /></Link>}
  </div>;
}

function ProjectVisual({project}: {project: Project}): ReactNode {
  const imageUrl = useBaseUrl(project.preview?.src ?? '/');
  if (project.preview) return <div className={classes('project-preview')}><img className={classes('project-image')} src={imageUrl} alt={project.preview.alt} width="640" height="400" loading="lazy" /></div>;
  if (project.visual === 'python') return <div className={classes('project-symbol')} aria-hidden="true">{projectVisuals.python}</div>;
  if (project.visual === 'slides') return <div className={classes('slide-study')} aria-hidden="true"><span><Lines lines={projectVisuals.slides} /></span><Icon name="layers" /></div>;
  if (project.visual !== 'website') return null;
  const visual = projectVisuals.website;
  return <div className={classes('project-preview')} role="img" aria-label={visual.label}>
    <div className={classes('preview-index')}>{visual.heading}</div>
    <div className={classes('mini-browser')} aria-hidden="true">
      <div className={classes('mini-bar')}><span className={classes('mini-brand')}>{visual.brand}</span><span>{visual.navigation}</span></div>
      <div className={classes('mini-body')}><span className={classes('mini-label')}>{visual.eyebrow}</span>
        <strong>{visual.headline[0]}<br /><span>{visual.headline[1]}</span></strong>
        <div className={classes('mini-rule')} /><div className={classes('mini-tiles')}><span><Icon name="book" /></span><span><Icon name="code" /></span><span><Icon name="layers" /></span></div>
      </div>
    </div><span className={classes('preview-caption')}>{visual.caption}</span>
  </div>;
}

function ProjectCard({project, index}: {project: Project; index: number}): ReactNode {
  if (project.layout === 'compact') return <article className={classes('project-row')}>
    <span className={classes('row-index')}>{String(index + 1).padStart(2, '0')}</span>
    <div><span className={classes('eyebrow')}>{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><Tags items={project.technologies} /><ProjectLinks project={project} /></div>
    <span className={classes('status')}>{project.status}</span>
  </article>;
  const featured = project.layout === 'featured';
  const copy = <>
    <div className={classes('project-kicker')}><span>{project.category}</span><span className={classes('status')}>{project.status}</span></div>
    {!featured && <ProjectVisual project={project} />}
    <h3>{project.title}</h3><p>{project.description}</p>
    {project.contribution && <p className={classes('project-detail')}>{project.contribution}</p>}
    <Tags items={project.technologies} /><ProjectLinks project={project} />
  </>;
  return <article className={classes(featured ? 'featured-project' : 'project-small')}>
    {featured ? <><ProjectVisual project={project} /><div className={classes('featured-copy')}>{copy}</div></> : copy}
  </article>;
}

export default function ProjectShowcase(): ReactNode {
  return <section id="projects" className={classes('section', 'container')} aria-labelledby="projects-title">
    <SectionHeading id="projects-title" copy={sectionCopy.projects} />
    {projects.filter(project => project.layout === 'featured').map(project => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />)}
    <div className={classes('project-pair')}>{projects.filter(project => project.layout === 'secondary').map(project => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />)}</div>
    {projects.filter(project => project.layout === 'compact').map(project => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />)}
  </section>;
}

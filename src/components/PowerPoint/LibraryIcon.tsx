import type {ReactNode} from 'react';

type IconName = 'slides' | 'search' | 'arrow' | 'book' | 'check' | 'download';

export default function LibraryIcon({name, className}: {name: IconName; className?: string}): ReactNode {
  const paths: Record<IconName, ReactNode> = {
    slides: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="m8 22 4-5 4 5M12 17v5M7 9h10M7 12h6" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    book: <><path d="M12 6v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2Z" /></>,
    check: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="m8 12 3 3 5-6" /></>,
    download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}

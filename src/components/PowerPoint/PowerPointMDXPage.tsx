import type {ReactNode} from 'react';
import DefaultMDXPage from '@theme/MDXPage';
import MDXContent from '@theme/MDXContent';
import type {Props} from '@theme/MDXPage';
import GameDetailPage from './GameDetailPage';
import {getGameForMdxPage} from './mdx';

export default function PowerPointMDXPage(props: Props): ReactNode {
  const {content: Content} = props;
  const game = getGameForMdxPage(Content.metadata.source);

  // Trang MDX ngoài PowerPoint tiếp tục dùng bố cục Docusaurus mặc định.
  if (!game) return <DefaultMDXPage {...props} />;

  return <GameDetailPage game={game}>
    <MDXContent><Content /></MDXContent>
  </GameDetailPage>;
}

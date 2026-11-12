import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import {powerpointGames} from '@site/src/data/powerpoint';
import {powerpointSamples} from '@site/src/data/powerpointSamples';
import GameLibrary from '@site/src/components/PowerPoint/GameLibrary';
import PowerPointHero from '@site/src/components/PowerPoint/PowerPointHero';
import PowerPointUsageGuide from '@site/src/components/PowerPoint/PowerPointUsageGuide';
import styles from '@site/src/components/PowerPoint/styles.module.css';

export default function PowerPointPage(): ReactNode {
  return (
    <Layout title="Thư viện trò chơi PowerPoint" description="Thư viện trò chơi PowerPoint phục vụ dạy học: tìm hoạt động phù hợp, xem hướng dẫn và truy cập tệp chia sẻ khi có.">
      <main className={styles.page}>
        <PowerPointHero />
        <GameLibrary games={powerpointGames.length > 0 ? powerpointGames : powerpointSamples} />

        <PowerPointUsageGuide />
      </main>
    </Layout>
  );
}

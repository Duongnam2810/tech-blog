import GameDetailPage from '@site/src/components/PowerPoint/GameDetailPage';
import {getSampleGame} from '@site/src/data/powerpointSamples';

export default function SampleWarmupPage() {
  return <GameDetailPage game={getSampleGame('mau-khoi-dong-nhanh')} />;
}

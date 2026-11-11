import GameDetailPage from '@site/src/components/PowerPoint/GameDetailPage';
import {getSampleGame} from '@site/src/data/powerpointSamples';

export default function SampleCrosswordPage() {
  return <GameDetailPage game={getSampleGame('mau-giai-ma-o-chu')} />;
}

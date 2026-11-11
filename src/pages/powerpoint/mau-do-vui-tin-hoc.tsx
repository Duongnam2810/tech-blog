import GameDetailPage from '@site/src/components/PowerPoint/GameDetailPage';
import {getSampleGame} from '@site/src/data/powerpointSamples';

export default function SampleQuizPage() {
  return <GameDetailPage game={getSampleGame('mau-do-vui-tin-hoc')} />;
}

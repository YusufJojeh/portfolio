import { useTranslations } from 'next-intl';
import ArchitectureScene from '../engine/ArchitectureScene';

export default function BusinessToSystem() {
  const t = useTranslations('final.system');
  const c = useTranslations('final.chapters');
  return (
    <ArchitectureScene
      id="business-to-system"
      chapter="03"
      chapterName={c('03')}
      heading={t('heading')}
      intro={t('intro')}
      layers={t.raw('layers')}
    />
  );
}

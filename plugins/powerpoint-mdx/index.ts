import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';

/** Docs exclude chỉ ngăn tạo route, không ngăn loader biên dịch file được Pages nhập. */
export default function isolatePowerPointMdx({siteDir}: LoadContext): Plugin {
  const docsDirectory = path.resolve(siteDir, 'docs');
  const powerpointDirectory = path.resolve(docsDirectory, 'powerpoint');
  const normalize = (value: string): string => value.replace(/\\/g, '/').replace(/\/+$/, '');

  return {
    name: 'isolate-powerpoint-mdx',
    configureWebpack(config) {
      const rules = (config.module?.rules ?? []).map(rule => {
        if (!rule || typeof rule !== 'object') return rule;
        const includesDocs = Array.isArray(rule.include) && rule.include.some(item =>
          typeof item === 'string' && normalize(item) === normalize(docsDirectory),
        );
        const usesMdxLoader = Array.isArray(rule.use) && rule.use.some(item =>
          item && typeof item === 'object' && typeof item.loader === 'string' && normalize(item.loader).includes('/@docusaurus/mdx-loader/'),
        );
        if (!includesDocs || !usesMdxLoader) return rule;

        const exclusions = rule.exclude ? (Array.isArray(rule.exclude) ? rule.exclude : [rule.exclude]) : [];
        return {...rule, exclude: [...exclusions, powerpointDirectory]};
      });
      return {mergeStrategy: {'module.rules': 'replace'}, module: {rules}};
    },
  };
}

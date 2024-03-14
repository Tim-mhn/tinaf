import { objectKeys } from '../../../v4/framework/utils/object';

function buildCssRuleString(
  {
    elementTag,
    attribute,
    attributeValue,
    pseudoSelector,
  }: {
    elementTag: string;
    attribute: string;
    attributeValue: string;
    pseudoSelector: string;
  },
  css: Record<string, string>
) {
  const stringifiedCss = objectKeys(css).reduce((prev, key) => {
    const cssValue = css[key];
    const stringifiedRule = `${key}:${cssValue};`;
    return `${prev}${stringifiedRule}`;
  }, '');

  return `${elementTag}[${attribute}="${attributeValue}"]:${pseudoSelector} { ${stringifiedCss} }`;
}

export function createCssRule(
  params: Parameters<typeof buildCssRuleString>[0],
  css: Record<string, string>
) {
  const cssRule = buildCssRuleString(params, css);
  document.styleSheets[0].insertRule(cssRule);
}

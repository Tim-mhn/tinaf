import { describe, expect, it } from 'vitest';
import { objectKeys } from '../../../v4/framework/utils/object';
import { createCssRule } from '.';

describe('createCssRule', () => {
  it('disabled css rule', () => {
    expect(
      createCssRule(
        {
          elementTag: 'button',
          attribute: 'x-id',
          attributeValue: '12345',
          pseudoSelector: 'disabled',
        },
        {
          background: 'blue',
        }
      )
    ).toEqual('button[x-id="12345"]:disabled { background:blue; }');
  });

  it('builds the custom css rule with multiple rules', () => {
    expect(
      createCssRule(
        {
          elementTag: 'button',
          attribute: 'x-id',
          attributeValue: '12345',
          pseudoSelector: 'disabled',
        },
        {
          background: 'blue',
          color: 'red',
          fontSize: '10px',
        }
      )
    ).toEqual(
      'button[x-id="12345"]:disabled { background:blue;color:red;fontSize:10px; }'
    );
  });
});

/**
 * document.styleSheets[0].insertRule('button[x-id="my-buton"]:disabled { background: blue !important; }')
 */

import { logger } from '../common';
import { type MaybeArray, toArray } from '../utils/array';
import { type WithHtml } from './component';

export function removeOldNodesAndRenderNewNodes({
  parent,
  oldNodes,
  newNodes,
}: {
  parent: WithHtml;
  oldNodes: MaybeArray<HTMLElement | Comment>;
  newNodes: MaybeArray<HTMLElement | Comment>;
}) {
  if (!parent.html) {
    console.warn('no html');
    return;
  }

  const allChildren = [...parent.html.childNodes];

  const firstNode = toArray(oldNodes)[0];
  const firstNodeIndex = allChildren.findIndex((n) => n === firstNode);

  toArray(oldNodes).forEach((node) => {
    safelyRemoveChild(parent, node);
  });

  toArray(newNodes).forEach((newNode, index) => {
    safelyInsertNode(parent, firstNodeIndex, index, newNode);
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safelyRemoveChild(parent: WithHtml, node: any) {
  try {
    parent.html.removeChild(node);
  } catch (err) {
    logger.warn('Error while removing child ');
    console.debug({ node });
    throw new Error('[TINAF] Error while removing child', { cause: err });
  }
}

function safelyInsertNode(
  parent: WithHtml,
  firstNodeIndex: number,
  index: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newNode: any
) {
  if (!newNode)
    throw new Error(
      '[TINAF] Error while adding new node. newNode is undefined',
      { cause: { parent } }
    );
  try {
    parent.html.insertBefore(
      newNode,
      [...parent.html.childNodes][firstNodeIndex + index]
    );
  } catch (err) {
    logger.warn('Error while adding node ', newNode);
    console.debug({ newNode });

    throw new Error('[TINAF] Error while adding child', { cause: err });
  }
}

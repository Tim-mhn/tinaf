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
  const allChildren = [...parent.html.childNodes];

  const firstNode = toArray(oldNodes)[0];
  const firstNodeIndex = allChildren.findIndex((n) => n === firstNode);

  toArray(oldNodes).forEach((node) => parent.html.removeChild(node));

  toArray(newNodes).forEach((newNode, index) => {
    parent.html.insertBefore(
      newNode,
      [...parent.html.childNodes][firstNodeIndex + index]
    );
  });
}

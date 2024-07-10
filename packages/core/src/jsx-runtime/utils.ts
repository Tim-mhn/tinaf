/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EventHandlers, Listener } from '../dom/create-dom-element';

export function extractEventHandlers(props: Record<string, any> | null = {}) {
  if (!props) return {};
  // FIXME: this is really not great. Find a way to avoid having to extract event handlers from other props
  const eventListeners = {
    onAbort: true,
    onAnimationEnd: true,
    onAnimationIteration: true,
    onAnimationStart: true,
    onAuxClick: true,
    onBeforeInput: true,
    onBlur: true,
    onCanPlay: true,
    onCanPlayThrough: true,
    onChange: true,
    onClick: true,
    onClose: true,
    onCompositionEnd: true,
    onCompositionStart: true,
    onCompositionUpdate: true,
    onContextMenu: true,
    onCopy: true,
    onCut: true,
    onDblClick: true,
    onDrag: true,
    onDragEnd: true,
    onDragEnter: true,
    onDragExit: true,
    onDragLeave: true,
    onDragOver: true,
    onDragStart: true,
    onDrop: true,
    onDurationChange: true,
    onEmptied: true,
    onEncrypted: true,
    onEnded: true,
    onError: true,
    onFocus: true,
    onFocusIn: true,
    onFocusOut: true,
    onFormData: true,
    onInput: true,
    onInvalid: true,
    onKeyDown: true,
    onKeyPress: true,
    onKeyUp: true,
    onLoad: true,
    onLoadedData: true,
    onLoadedMetadata: true,
    onLoadStart: true,
    onMouseDown: true,
    onMouseEnter: true,
    onMouseLeave: true,
    onMouseMove: true,
    onMouseOut: true,
    onMouseOver: true,
    onMouseUp: true,
    onPaste: true,
    onPause: true,
    onPlay: true,
    onPlaying: true,
    onPointerDown: true,
    onPointerMove: true,
    onPointerUp: true,
    onPointerCancel: true,
    onPointerEnter: true,
    onPointerLeave: true,
    onPointerOver: true,
    onPointerOut: true,
    onPointerLockChange: true,
    onPointerLockError: true,
    onProgress: true,
    onRateChange: true,
    onReset: true,
    onResize: true,
    onScroll: true,
    onSecurityPolicyViolation: true,
    onSeeked: true,
    onSeeking: true,
    onSelect: true,
    onStalled: true,
    onSubmit: true,
    onSuspend: true,
    onTimeUpdate: true,
    onToggle: true,
    onTouchCancel: true,
    onTouchEnd: true,
    onTouchMove: true,
    onTouchStart: true,
    onTransitionEnd: true,
    onVolumeChange: true,
    onWaiting: true,
    onWheel: true,
  } as const;

  const handlers: EventHandlers = {};

  for (const key in props) {
    if (key in eventListeners && typeof props[key] === 'function') {
      const listenerKey = key.split('on')[1].toLowerCase() as Listener;
      const eventHandler = props[key];
      handlers[listenerKey] = eventHandler;
    }
  }

  return handlers;
}

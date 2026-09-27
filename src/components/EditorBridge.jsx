import { useEffect } from 'react';

// A parent can change this preview DOM only. Persistence always goes through authenticated server validation.
export default function EditorBridge({ origin }) {
  useEffect(() => {
    if (!origin || window.parent === window) return;
    let allowed;
    try {
      allowed = new URL(origin).origin;
    } catch {
      return;
    }
    let channel = null,
      enabled = false;
    const style = document.createElement('style');
    style.textContent =
      '[data-editor-active] [data-edit]:hover{outline:2px dashed #d4af37;outline-offset:4px;cursor:crosshair!important}';
    document.head.append(style);
    const receive = (e) => {
      if (
        e.source !== window.parent ||
        e.origin !== allowed ||
        !e.data ||
        typeof e.data !== 'object'
      )
        return;
      if (
        e.data.type === 'aicoder:editor:init' &&
        /^[a-f0-9-]{32,40}$/.test(e.data.channel || '')
      ) {
        channel = e.data.channel;
        enabled = Boolean(e.data.enabled);
        document.documentElement.toggleAttribute('data-editor-active', enabled);
        window.parent.postMessage({ type: 'aicoder:editor:ready', channel }, allowed);
        return;
      }
      if (!enabled || e.data.channel !== channel) return;
      if (
        e.data.type === 'aicoder:editor:patch' &&
        typeof e.data.path === 'string' &&
        typeof e.data.value === 'string'
      ) {
        for (const el of document.querySelectorAll('[data-edit]'))
          if (el.dataset.edit === e.data.path) {
            if (el.tagName === 'IMG') {
              if (!/^(https:\/\/|\/media\/|data:image\/webp;base64,)/.test(e.data.value)) continue;
              el.removeAttribute('srcset');
              el.src = e.data.value;
            } else el.textContent = e.data.value;
          }
      }
    };
    const select = (e) => {
      if (!enabled) return;
      const el = e.target.closest('[data-edit],[data-edit-target]');
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      window.parent.postMessage(
        { type: 'aicoder:editor:select', channel, path: el.dataset.edit || el.dataset.editTarget },
        allowed
      );
    };
    window.addEventListener('message', receive);
    document.addEventListener('click', select, true);
    return () => {
      window.removeEventListener('message', receive);
      document.removeEventListener('click', select, true);
      style.remove();
      document.documentElement.removeAttribute('data-editor-active');
    };
  }, [origin]);
  return null;
}


import { useEffect } from 'react';

export const useSecurity = () => {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      if (
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'i') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        return false;
      }
    };

    const protectCopyright = () => {
      const copyrightElements = document.querySelectorAll('[data-protected="true"]');
      copyrightElements.forEach((element) => {
        const parent = element.parentElement;
        if (parent) {
          const config = {
            get: function () {
              return element;
            },
            configurable: false,
          };
          Object.defineProperty(parent, 'lastElementChild', config);
        }
      });
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    protectCopyright();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.removedNodes.forEach((node) => {
            if (
              node instanceof HTMLElement && node.hasAttribute('data-protected')) {
              console.warn('检测到版权保护元素被移除');
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, []);
};

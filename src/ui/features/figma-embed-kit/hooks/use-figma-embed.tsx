import { useCallback, useEffect, useMemo, useRef } from 'react';
import { FIGMA_ORIGIN } from '~/ui/features/figma-embed-kit/constants';
import {
  type PostMessageEventType,
  POST_MESSAGE_TYPE,
} from '~/ui/features/figma-embed-kit/types/post-message-event';
import {
  type PrototypeEvent,
  isPreviewReadyToReceiveMessagesEvent,
  isPreviewSetFrameControlsEvent,
  isPrototypeEvent,
} from '~/ui/features/figma-embed-kit/types/prototype-event';

interface UseFigmaEmbedOptions {
  onPreviewSetFrameControls: (config: {
    navigateBackwardEnabled: boolean;
    navigateForwardEnabled: boolean;
  }) => void;
  onPreviewReadyToReceiveMessages: () => void;
}

/**
 * Implementation based on the: https://github.com/figma/embed-kit-2.0-example
 *
 * @argument iframeRef - The iframe element that you want to message.
 */
function useFigmaEmbed(options?: Partial<UseFigmaEmbedOptions>) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const postMessage = useCallback(
    (type: PostMessageEventType) => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: POST_MESSAGE_TYPE[type],
          },
          FIGMA_ORIGIN
        );
      }
    },
    [iframeRef]
  );

  const navigateForward = useCallback(() => {
    postMessage('NAVIGATE_FORWARD');
  }, [postMessage]);

  const navigateBackward = useCallback(() => {
    postMessage('NAVIGATE_BACKWARD');
  }, [postMessage]);

  const restartPrototype = useCallback(() => {
    postMessage('RESTART_PROTOTYPE');
  }, [postMessage]);

  useEffect(() => {
    function handlePrototypeEvent(event: PrototypeEvent) {
      console.log('[USE-FIGMA-EMBED][EVENT]', event);

      if (isPreviewSetFrameControlsEvent(event)) {
        options?.onPreviewSetFrameControls?.({
          navigateBackwardEnabled: event.data.navigateBackwardEnabled,
          navigateForwardEnabled: event.data.navigateForwardEnabled,
        });
      }

      if (isPreviewReadyToReceiveMessagesEvent(event)) {
        options?.onPreviewReadyToReceiveMessages?.();
      }
    }

    function handleWindowMessageEvent(event: MessageEvent) {
      console.log('debug:event', event, event.source);
      if (isPrototypeEvent(event)) {
        handlePrototypeEvent(event.data);
      }
    }

    window.addEventListener('message', handleWindowMessageEvent);

    return () => {
      window.removeEventListener('message', handleWindowMessageEvent);
    };
  }, [options]);

  return useMemo(
    () =>
      [
        iframeRef,
        { navigateForward, navigateBackward, restartPrototype },
      ] as const,
    [navigateBackward, navigateForward, restartPrototype]
  );
}

export { useFigmaEmbed };

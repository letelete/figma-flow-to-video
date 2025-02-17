import { useCallback, useEffect } from 'react';
import { RequestMessage, ResponseMessage } from '~/lib/types/message.types';

export function usePluginPostMessage() {
  const post = useCallback((pluginMessage: RequestMessage) => {
    window.parent.postMessage(
      {
        pluginMessage,
      },
      '*'
    );
  }, []);

  return { post };
}

export function isPluginMessageResponseEvent(
  event: MessageEvent
): event is MessageEvent<{ pluginMessage: ResponseMessage }> {
  return (
    (event.data?.pluginMessage as ResponseMessage | undefined)?.type ===
    'response'
  );
}

export function usePluginMessageHandler(
  onMessage: (pluginMessage: ResponseMessage) => void
) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (isPluginMessageResponseEvent(event)) {
        onMessage(event.data.pluginMessage);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onMessage]);
}

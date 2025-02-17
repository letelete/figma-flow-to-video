import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CreateRectangleRequestMessage,
  RequestMessage,
  ResponseMessage,
} from '~/backend/messenger/types';
import { FlowStartingPoint } from '~/backend/services/flow-starting-point-service';

function usePostMessage() {
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

function isPluginMessageResponseEvent(
  event: MessageEvent
): event is MessageEvent<{ pluginMessage: ResponseMessage }> {
  return (
    (event.data?.pluginMessage as ResponseMessage | undefined)?.type ===
    'response'
  );
}

function usePluginMessageHandler(
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

export function useRectanglesMessenger() {
  const { post } = usePostMessage();

  const createRectangle = useCallback(
    (data: CreateRectangleRequestMessage['data']) => {
      post({ type: 'request', key: 'CREATE_RECTANGLE', data });
    },
    [post]
  );

  return useMemo(
    () => ({
      createRectangle,
    }),
    [createRectangle]
  );
}

export function useFlowStartingPointMessenger() {
  const { post } = usePostMessage();

  const [flowStartingPoints, setFlowStartingPoints] = useState<
    null | FlowStartingPoint[]
  >(null);

  usePluginMessageHandler((pluginMessage) => {
    switch (pluginMessage.key) {
      case 'FLOW_STARTING_POINT':
        setFlowStartingPoints(pluginMessage.data.flowStartingPoints);
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    post({ type: 'request', key: 'FLOW_STARTING_POINT' });
  }, [post]);

  return useMemo(
    () => ({
      flowStartingPoints,
    }),
    [flowStartingPoints]
  );
}

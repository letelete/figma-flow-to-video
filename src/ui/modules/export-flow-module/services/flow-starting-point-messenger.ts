import { useState, useEffect, useMemo } from 'react';
import { FlowStartingPoint } from '~/lib/types/flow.types';
import {
  usePluginMessageHandler,
  usePluginPostMessage,
} from '~/ui/services/messenger';

export function useFlowStartingPointMessenger() {
  const { post } = usePluginPostMessage();

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

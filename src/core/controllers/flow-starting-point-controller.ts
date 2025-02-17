import { MessageSender } from '~/core/messenger/message-sender';
import { getFlowStartingPoints } from '~/core/services/flow-starting-point-service';
import { FlowStartingPoint } from '~/lib/types/flow.types';

export interface FlowStartingPointsResponseData {
  flowStartingPoints: FlowStartingPoint[];
}

export function FlowStartingPointController() {
  const requestFlowStartingPoints = () => {
    const flowStartingPoints = getFlowStartingPoints();

    MessageSender.sendResponseMessage({
      type: 'response',
      key: 'FLOW_STARTING_POINT',
      data: { flowStartingPoints },
    });
  };

  return { requestFlowStartingPoints };
}

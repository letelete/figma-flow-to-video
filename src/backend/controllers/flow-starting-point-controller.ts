import { MessageSender } from '~/backend/messenger/message-sender';
import {
  FlowStartingPoint,
  getFlowStartingPoints,
} from '~/backend/services/flow-starting-point-service';

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

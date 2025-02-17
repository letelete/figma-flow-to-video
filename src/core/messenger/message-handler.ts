import { FlowStartingPointController } from '~/core/controllers/flow-starting-point-controller';
import { RequestMessage } from '~/lib/types/message.types';

const messageHandler: MessageEventHandler = (message: RequestMessage) => {
  const flowStartingPointController = FlowStartingPointController();

  switch (message.key) {
    case 'FLOW_STARTING_POINT':
      flowStartingPointController.requestFlowStartingPoints();
      break;
  }
};

export const Messenger = {
  messageHandler,
};

import { FlowStartingPointController } from '../controllers/flow-starting-point-controller';
import { RectangleController } from '../controllers/rectangle-controller';
import { RequestMessage } from './types';

const messageHandler: MessageEventHandler = (message: RequestMessage) => {
  const flowStartingPointController = FlowStartingPointController();

  switch (message.key) {
    case 'CREATE_RECTANGLE':
      RectangleController({ data: message.data });
      break;
    case 'FLOW_STARTING_POINT':
      flowStartingPointController.requestFlowStartingPoints();
      break;
  }
};

export const Messenger = {
  messageHandler,
};

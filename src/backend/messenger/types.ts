import { FlowStartingPointsResponseData } from '../controllers/flow-starting-point-controller';
import { CreateRectangleRequestData } from '../controllers/rectangle-controller';

export interface PluginMessage {
  type: 'request' | 'response';
  key: string;
  data?: unknown;
}

export interface CreateRectangleRequestMessage extends PluginMessage {
  type: 'request';
  key: 'CREATE_RECTANGLE';
  data: CreateRectangleRequestData;
}

export interface FlowStartingPointsRequestMessage extends PluginMessage {
  type: 'request';
  key: 'FLOW_STARTING_POINT';
}

export interface FlowStartingPointsResponseMessage extends PluginMessage {
  type: 'response';
  key: 'FLOW_STARTING_POINT';
  data: FlowStartingPointsResponseData;
}

export type RequestMessage =
  | CreateRectangleRequestMessage
  | FlowStartingPointsRequestMessage;

export type ResponseMessage = FlowStartingPointsResponseMessage;

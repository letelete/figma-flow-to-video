import { FlowStartingPointsResponseData } from '~/core/controllers/flow-starting-point-controller';

export interface PluginMessage {
  type: 'request' | 'response';
  key: string;
  data?: unknown;
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

export type RequestMessage = FlowStartingPointsRequestMessage;

export type ResponseMessage = FlowStartingPointsResponseMessage;

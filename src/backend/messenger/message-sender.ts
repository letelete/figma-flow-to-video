import { ResponseMessage } from './types';

function sendResponseMessage(message: ResponseMessage) {
  figma.ui.postMessage(message);
}

export const MessageSender = {
  sendResponseMessage,
};

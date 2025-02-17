import { ResponseMessage } from '~/backend/messenger/types';

function sendResponseMessage(message: ResponseMessage) {
  figma.ui.postMessage(message);
}

export const MessageSender = {
  sendResponseMessage,
};

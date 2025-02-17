import { ResponseMessage } from '~/lib/types/message.types';

function sendResponseMessage(message: ResponseMessage) {
  figma.ui.postMessage(message);
}

export const MessageSender = {
  sendResponseMessage,
};

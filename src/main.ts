import { Messenger } from './backend/messenger/message-handler';

export default function () {
  figma.showUI(__html__, {
    themeColors: true,
    width: 540,
    height: 960,
  });

  figma.ui.onmessage = Messenger.messageHandler;
}

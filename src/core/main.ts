import { Messenger } from '~/core/messenger/message-handler';

export default function () {
  figma.showUI(__html__, {
    themeColors: true,
    width: 540,
    height: 540,
  });

  figma.ui.onmessage = Messenger.messageHandler;
}

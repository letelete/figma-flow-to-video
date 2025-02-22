import { FIGMA_ORIGIN } from '~/ui/features/figma-embed-kit/constants';

export const PROTOTYPE_EVENTS = [
  'INLINE_PREVIEW_SET_FRAME_CONTROLS',
  'INLINE_PREVIEW_READY_TO_RECEIVE_MESSAGES',
] as const;

export type PrototypeEventType = (typeof PROTOTYPE_EVENTS)[number];

export interface PrototypeEvent {
  type: PrototypeEventType;
  data?: unknown;
}

export function isPrototypeEvent(
  event: MessageEvent
): event is MessageEvent<PrototypeEvent> {
  return (
    event.origin === FIGMA_ORIGIN
    //  && PROTOTYPE_EVENTS.includes(event.data.type)
  );
}

export interface PreviewSetFrameControlsEvent extends PrototypeEvent {
  type: 'INLINE_PREVIEW_SET_FRAME_CONTROLS';
  data: {
    navigateBackwardEnabled: boolean;
    navigateForwardEnabled: boolean;
  };
}

export function isPreviewSetFrameControlsEvent(
  event: PrototypeEvent
): event is PreviewSetFrameControlsEvent {
  return event.type === 'INLINE_PREVIEW_SET_FRAME_CONTROLS';
}

export interface PreviewReadyToReceiveMessagesEvent extends PrototypeEvent {
  type: 'INLINE_PREVIEW_READY_TO_RECEIVE_MESSAGES';
}

export function isPreviewReadyToReceiveMessagesEvent(
  event: PrototypeEvent
): event is PreviewReadyToReceiveMessagesEvent {
  return event.type === 'INLINE_PREVIEW_READY_TO_RECEIVE_MESSAGES';
}

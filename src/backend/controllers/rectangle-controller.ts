import { RectangleNodeBuilder } from '../services/rectangle-node-service';

export interface CreateRectangleRequestData {
  count: number;
}

export interface RectangleControllerProps {
  data: CreateRectangleRequestData;
}

export function RectangleController(props: RectangleControllerProps) {
  const rectangles = new RectangleNodeBuilder()
    .setCount(props.data.count)
    .build();
  figma.viewport.scrollAndZoomIntoView(rectangles);
}

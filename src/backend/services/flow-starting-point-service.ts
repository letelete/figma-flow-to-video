export interface FlowStartingPoint {
  nodeId: string;
  name: string;
}

export function getFlowStartingPoints() {
  return [
    ...figma.currentPage.flowStartingPoints,
  ] satisfies FlowStartingPoint[];
}

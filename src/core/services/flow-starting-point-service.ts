import { FlowStartingPoint } from '~/lib/types/flow.types';

export function getFlowStartingPoints() {
  return [
    ...figma.currentPage.flowStartingPoints,
  ] satisfies FlowStartingPoint[];
}

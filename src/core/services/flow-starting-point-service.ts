import { FlowStartingPoint } from '~/lib/types/flow.types';

export function getFlowStartingPoints() {
  console.log('debug:figma:obj', figma);
  return [
    ...figma.currentPage.flowStartingPoints.map((fsp) => ({
      ...fsp,
      projectId: figma.fileKey ?? '',
    })),
  ] satisfies FlowStartingPoint[];
}

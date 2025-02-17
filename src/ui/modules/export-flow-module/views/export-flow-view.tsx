import { IconButton, TooltipProvider } from 'figma-kit';
import { ComponentPropsWithoutRef } from 'react';
import { AppBar } from '~/ui/components/app-bar';
import { ChevronLeftIcon } from '~/ui/components/icon/icons';
import { useExportFlowContext } from '~/ui/modules/export-flow-module/controllers/export-flow-controller';

// TODO: handle embedding
// https://www.figma.com/proto/sIJaakwutU0G8LcMettaSP?embed_host=inline-viewer&hide-ui=1&inline-viewer=1&kind=proto&node-id=48:117
const ExportFlowView = ({
  ...props
}: ComponentPropsWithoutRef<'div'> & { onGoBack?: () => void }) => {
  const { startingPoint, clearStartingPoint } = useExportFlowContext();

  if (!startingPoint) {
    throw new Error('ExportFlowView requires FlowStartingPoint to be defined.');
  }

  return (
    <div {...props}>
      <AppBar
        leading={
          <TooltipProvider>
            <IconButton aria-label='Go back' onClick={clearStartingPoint}>
              <ChevronLeftIcon />
            </IconButton>
          </TooltipProvider>
        }
        title={`Exporting ${startingPoint.name}`}
      />
    </div>
  );
};
ExportFlowView.displayName = 'ExportFlowView';

export { ExportFlowView };

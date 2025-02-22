import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { FlowStartingPoint } from '~/lib/types/flow.types';
import { FigmaEmbed, useFigmaEmbedSource } from '~/ui/features/figma-embed-kit';
import { cn } from '~/ui/utils/styles';
import { Text } from 'figma-kit';

const ExportFlowPreview = forwardRef<
  ElementRef<typeof FigmaEmbed>,
  ComponentPropsWithoutRef<typeof FigmaEmbed> & {
    startingPoint: FlowStartingPoint;
  }
>(({ className, startingPoint, ...rest }, ref) => {
  const [figmaEmbedSrc] = useFigmaEmbedSource(
    startingPoint.projectId,
    startingPoint.nodeId
  );

  if (!figmaEmbedSrc) {
    return <Text className='text-danger'>Cannot generate preview.</Text>;
  }

  return (
    <FigmaEmbed
      className={cn('size-full', className)}
      ref={ref}
      src={figmaEmbedSrc.toString()}
      {...rest}
    />
  );
});
ExportFlowPreview.displayName = 'ExportFlowPreview';

export { ExportFlowPreview };

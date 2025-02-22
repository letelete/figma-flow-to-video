import { ChevronLeft } from 'lucide-react';
import { Text } from 'figma-kit';
import { ComponentPropsWithoutRef, useMemo, useState } from 'react';
import { AppBar, AppBarProgressInfoFooter } from '~/ui/components/app-bar';
import { AppContainer } from '~/ui/components/app-container';
import { IconButton } from '~/ui/components/icon-button';
import { SpokeSpinningLoader } from '~/ui/components/loader';
import { useFigmaEmbed } from '~/ui/features/figma-embed-kit';
import { useMediaRecorder } from '~/ui/hooks/use-media-recorder';
import { ExportFlowPreview } from '~/ui/modules/export-flow-module/components/export-flow-preview';
import { useExportFlowProcessingContext } from '~/ui/modules/export-flow-module/controllers/export-flow-controller';
import { cn } from '~/ui/utils/styles';
import mergeRefs from 'merge-refs';

const ExportFlowProcessingView = ({
  ...props
}: ComponentPropsWithoutRef<'div'> & { onGoBack?: () => void }) => {
  const { startingPoint, exportData, cancelSubmit } =
    useExportFlowProcessingContext();

  const [isLoadingPreview, setIsLoadingPreview] = useState(true);

  const [recorderRef, recorder] = useMediaRecorder({
    properties: {
      width: exportData.width,
      height: exportData.height,
      frameRate: exportData.frameRate,
      mimeType: exportData.mimeType,
      name: startingPoint.name,
    },
    onStartRecording: () => {
      setTimeout(() => recorder.stopRecording(), 5000);
    },
    onStopRecording: (blob) => {
      // const url = URL.createObjectURL(blob);
      // const filename = `${startingPoint.name}.${exportData.mimeType}`;

      figma.ui.postMessage({ type: 'download', blob });
    },
  });

  const [figmaEmbedRef] = useFigmaEmbed({
    onPreviewReadyToReceiveMessages: () => {
      setIsLoadingPreview(true);
    },
  });

  const [progressValue, progressMessage] = useMemo(() => {
    if (recorder.error) {
      return [0, ''];
    }
    if (recorder.isCompleted) {
      return [100, 'Done!'];
    }
    if (recorder.isRecording) {
      return [66, 'Processing...'];
    }
    if (!isLoadingPreview) {
      return [33, 'Setting up...'] as const;
    }
    return [10, 'Initializing...'] as const;
  }, [
    isLoadingPreview,
    recorder.error,
    recorder.isCompleted,
    recorder.isRecording,
  ]);

  return (
    <div {...props}>
      <AppBar
        leading={
          <IconButton aria-label='Cancel' onClick={cancelSubmit}>
            <ChevronLeft />
          </IconButton>
        }
        title={`Exporting "${startingPoint.name}" Flow...`}
      >
        <AppBarProgressInfoFooter progressValue={progressValue}>
          {progressMessage}
        </AppBarProgressInfoFooter>
      </AppBar>

      <AppContainer className='overflow-hidden'>
        {recorder.isCompleted ? (
          <Text className='text-success'>
            Done! Video will download shortly.
          </Text>
        ) : recorder.error ? (
          <Text className='text-danger'>{recorder.error.message}</Text>
        ) : (
          <SpokeSpinningLoader className={cn('mx-auto')} />
        )}

        <ExportFlowPreview
          sandbox='allow-scripts allow-same-origin'
          ref={mergeRefs(figmaEmbedRef, recorderRef)}
          className='invisible absolute -z-50'
          style={{ width: exportData.width, height: exportData.height }}
          allow='displaycapture'
          startingPoint={startingPoint}
        />
      </AppContainer>
    </div>
  );
};
ExportFlowProcessingView.displayName = 'ExportFlowProcessingView';

export { ExportFlowProcessingView };

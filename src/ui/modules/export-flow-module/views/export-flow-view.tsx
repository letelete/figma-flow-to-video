import { Button, Input, Select, Text } from 'figma-kit';
import { ChevronLeft } from 'lucide-react';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  FormEventHandler,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import { AppBar } from '~/ui/components/app-bar';
import { AppContainer } from '~/ui/components/app-container';
import { IconButton } from '~/ui/components/icon-button';
import { useFigmaEmbed } from '~/ui/features/figma-embed-kit';
import { useUnmount } from '~/ui/hooks/use-unmount';
import { ExportFlowPreview } from '~/ui/modules/export-flow-module/components/export-flow-preview';
import { ExportFlowPreviewCard } from '~/ui/modules/export-flow-module/components/export-flow-preview-card';
import { useExportFlowContext } from '~/ui/modules/export-flow-module/controllers/export-flow-controller';
import { MIME_TYPES, MimeType } from '~/ui/utils/mime-type';
import { cn } from '~/ui/utils/styles';
import { PickUnion } from '~/ui/utils/types';

const videoMimeTypes = ['video/mp4', 'video/webm'] satisfies MimeType[];

interface ExportVideoData {
  type: 'video';
  width: number;
  height: number;
  frameRate: number;
  mimeType: PickUnion<MimeType, (typeof videoMimeTypes)[number]>;
}

type ExportData = ExportVideoData;

const DEFAULT_EXPORT_DATA = {
  type: 'video',
  frameRate: 60,
  width: 1920,
  height: 1080,
  mimeType: 'video/mp4',
} satisfies ExportData;

const ExportFlowView = ({
  ...props
}: ComponentPropsWithoutRef<'div'> & { onGoBack?: () => void }) => {
  const [isLoadingPreview, setIsLoadingPreview] = useState(true);

  const {
    startingPoint,
    exportData,
    clearStartingPoint,
    setExportData,
    submit,
  } = useExportFlowContext();
  const [figmaEmbedRef] = useFigmaEmbed({
    onPreviewReadyToReceiveMessages: () => {
      setIsLoadingPreview(false);
    },
  });

  if (!startingPoint) {
    throw new Error('ExportFlowView requires FlowStartingPoint to be defined.');
  }

  const canSubmit = !isLoadingPreview;

  const handleFormSubmit = useCallback(
    (data: ExportData) => {
      if (canSubmit) {
        setExportData(data);
        submit();
      }
    },
    [canSubmit, setExportData, submit]
  );
  const handleFormUnmount = useCallback(
    (data: ExportData) => {
      setExportData(data);
    },
    [setExportData]
  );

  return (
    <div {...props}>
      <AppBar
        leading={
          <IconButton aria-label='Go back' onClick={clearStartingPoint}>
            <ChevronLeft />
          </IconButton>
        }
        title={`Export "${startingPoint.name}" Flow`}
      />

      <AppContainer>
        <ExportFlowPreviewCard isLoading={isLoadingPreview}>
          <ExportFlowPreview
            className='relative z-10'
            ref={figmaEmbedRef}
            startingPoint={startingPoint}
          />
        </ExportFlowPreviewCard>

        <ExportSettingsForm
          disabled={!canSubmit}
          initialData={exportData ?? DEFAULT_EXPORT_DATA}
          onSubmit={handleFormSubmit}
          onUnmount={handleFormUnmount}
        />
      </AppContainer>
    </div>
  );
};

const ExportSettingsForm = forwardRef<
  ElementRef<'form'>,
  Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> & {
    initialData: ExportData;
    disabled?: boolean;
    onSubmit?: (data: ExportData) => void;
    onUnmount?: (data: ExportData) => void;
  }
>(({ initialData, disabled, className, onSubmit, onUnmount, ...rest }, ref) => {
  const [formExportData, setFormExportData] = useState<ExportData>(initialData);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit?.(formExportData);
    },
    [formExportData, onSubmit]
  );

  useUnmount(() => {
    onUnmount?.(formExportData);
  });

  return (
    <form
      ref={ref}
      className={cn('', className)}
      onSubmit={handleSubmit}
      aria-disabled={disabled}
      {...rest}
    >
      <fieldset className='flex flex-col gap-y-2 w-full' disabled={disabled}>
        <div>
          <Text className='pb-2' weight='strong' asChild>
            <label htmlFor='input:width'>Width</label>
          </Text>
          <Input
            id='input:width'
            type='number'
            placeholder='Width'
            value={formExportData.width}
            min={1}
            onChange={(e) => {
              try {
                const width = parseInt(e.target.value);
                setFormExportData((data) => ({ ...data, width }));
              } catch {
                // pass
              }
            }}
          />
        </div>

        <div>
          <Text className='pb-2' weight='strong' asChild>
            <label htmlFor='input:height'>Height</label>
          </Text>
          <Input
            id='input:height'
            type='number'
            placeholder='Height'
            min={1}
            value={formExportData.height}
            onChange={(e) => {
              try {
                const height = parseInt(e.target.value);
                setFormExportData((data) => ({ ...data, height }));
              } catch {
                // pass
              }
            }}
          />
        </div>

        <div>
          <Text className='pb-2' weight='strong' asChild>
            <label htmlFor='input:frame-rate'>Frame rate</label>
          </Text>
          <Input
            id='input:frame-rate'
            type='number'
            placeholder={formExportData.frameRate.toString()}
            value={formExportData.frameRate}
            min={1}
            max={60}
            onChange={(e) => {
              try {
                const frameRate = parseInt(e.target.value);
                setFormExportData((data) => ({ ...data, frameRate }));
              } catch {
                // pass
              }
            }}
          />
        </div>

        <div>
          <Text className='pb-2' weight='strong' asChild>
            <label htmlFor='input:mime-type'>Format</label>
          </Text>
          <Select.Root
            value={formExportData.mimeType}
            onValueChange={(mimeType: ExportVideoData['mimeType']) => {
              setFormExportData((data) => ({ ...data, mimeType }));
            }}
          >
            <Select.Trigger id={'mime-type'} placeholder='Select format…' />
            <Select.Content>
              {videoMimeTypes.map((value) => (
                <Select.Item key={value} value={value}>
                  {MIME_TYPES[value].name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

        <Button type='submit' className='w-full' variant='primary'>
          Export
        </Button>
      </fieldset>
    </form>
  );
});
ExportSettingsForm.displayName = 'ExportSettingsForm';

export { ExportFlowView };
export type { ExportData };

import {
  ComponentPropsWithoutRef,
  FormEventHandler,
  useCallback,
  useState,
} from 'react';
import { Button, Link, Select, Text } from 'figma-kit';
import { Trans, useTranslation } from 'react-i18next';
import { useFlowStartingPointMessenger } from '~/ui/modules/export-flow-module/services/flow-starting-point-messenger';
import { FlowStartingPoint } from '~/lib/types/flow.types';
import { useExportFlowContext } from '~/ui/modules/export-flow-module/controllers/export-flow-controller';
import { AppBar } from '~/ui/components/app-bar';
import { cn } from '~/ui/utils/styles';
import { AppContainer } from '~/ui/components/app-container';

const SelectFlowView = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => {
  const { t } = useTranslation('select-flow-view');
  const { flowStartingPoints } = useFlowStartingPointMessenger();
  const { setStartingPoint } = useExportFlowContext();

  const [selectedFlow, setSelectedFlow] = useState<FlowStartingPoint | null>(
    null
  );

  const handleFormSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (selectedFlow) {
        setStartingPoint(selectedFlow);
      }
    },
    [selectedFlow, setStartingPoint]
  );

  if (flowStartingPoints === null) {
    return (
      <div>
        <AppBar title={t('title')} />
        <AppContainer className='items-center'>
          <Text>{t('state.loading')}</Text>
        </AppContainer>
      </div>
    );
  }

  if (!flowStartingPoints.length) {
    return (
      <div>
        <AppBar title={t('title')} />
        <AppContainer className='items-center'>
          <Text>
            <Trans
              ns='select-flow-view'
              i18nKey='state.empty'
              components={{
                bold: <strong />,
                'prototype-flow': (
                  <Link href='https://help.figma.com/hc/en-us/articles/360039823894-Create-and-manage-prototype-flows' />
                ),
              }}
            />
          </Text>
        </AppContainer>
      </div>
    );
  }

  return (
    <div className={cn(className)} {...props}>
      <AppBar title={t('title')} />

      <AppContainer>
        <form onSubmit={handleFormSubmit}>
          <Text className='font-strong' asChild>
            <label>{t('select-flow-form.title')}</label>
          </Text>

          <div className='flex gap-x-2 mt-2'>
            <Select.Root
              value={selectedFlow?.nodeId}
              onValueChange={(nodeId) => {
                console.log('selected node', nodeId);
                setSelectedFlow(
                  flowStartingPoints.find((flow) => flow.nodeId === nodeId) ??
                    null
                );
              }}
            >
              <Select.Trigger placeholder='Select Prototype Flow…' />
              <Select.Content>
                {flowStartingPoints.map((startingPoint) => (
                  <Select.Item
                    key={startingPoint.nodeId}
                    value={startingPoint.nodeId}
                  >
                    {startingPoint.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

            <Button
              variant='primary'
              disabled={selectedFlow === null}
              type='submit'
            >
              {t('select-flow-form.submit-button')}
            </Button>
          </div>
        </form>
      </AppContainer>
    </div>
  );
};
SelectFlowView.displayName = 'SelectFlowView';

export { SelectFlowView };

import {
  ComponentPropsWithoutRef,
  FormEventHandler,
  useCallback,
  useState,
} from 'react';
import { useFlowStartingPointMessenger } from '../../services/messenger';
import { Button, Link, Select, Text } from 'figma-kit';
import { Trans, useTranslation } from 'react-i18next';
import { FlowStartingPoint } from '../../../backend/services/flow-starting-point-service';

const SelectFlowView = ({ ...props }: ComponentPropsWithoutRef<'div'>) => {
  const { t } = useTranslation('select-flow-view');
  const { flowStartingPoints } = useFlowStartingPointMessenger();

  const [selectedFlow, setSelectedFlow] = useState<FlowStartingPoint | null>(
    null
  );

  const handleFormSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      console.log('Submitted', selectedFlow);
    },
    [selectedFlow]
  );

  if (flowStartingPoints === null) {
    return (
      <div>
        <Text>{t('state.loading')}</Text>
      </div>
    );
  }

  if (!flowStartingPoints.length) {
    return (
      <div>
        <Text>
          <Trans
            ns='select-flow-view'
            i18nKey='state.empty'
            components={{
              bold: <strong />,
              link: (
                <Link href='https://help.figma.com/hc/en-us/articles/360039823894-Create-and-manage-prototype-flows' />
              ),
            }}
          />
        </Text>
      </div>
    );
  }

  return (
    <div {...props}>
      <Text>{t('title')}</Text>

      <form onSubmit={handleFormSubmit}>
        <Select.Root
          value={selectedFlow?.nodeId}
          onValueChange={(nodeId) => {
            console.log('selected node', nodeId);
            setSelectedFlow(
              flowStartingPoints.find((flow) => flow.nodeId === nodeId) ?? null
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

        <Button disabled={selectedFlow === null} type='submit'>
          {t('submit-flow-button')}
        </Button>
      </form>
    </div>
  );
};
SelectFlowView.displayName = 'SelectFlowView';

export { SelectFlowView };

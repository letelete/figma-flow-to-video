import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { FlowStartingPoint } from '~/lib/types/flow.types';
import { ExportFlowProcessingView } from '~/ui/modules/export-flow-module/views/export-flow-processing-view';
import {
  ExportData,
  ExportFlowView,
} from '~/ui/modules/export-flow-module/views/export-flow-view';
import { SelectFlowView } from '~/ui/modules/export-flow-module/views/select-flow-view';
import { NonNullableProperties } from '~/ui/utils/types';

interface ExportFlowContextState {
  startingPoint: FlowStartingPoint | null;
  exportData: ExportData | null;
  submitted: boolean;

  setStartingPoint: (fsp: FlowStartingPoint) => void;
  clearStartingPoint: () => void;

  setExportData: (data: ExportData) => void;
  clearExportData: () => void;

  submit: () => void;
  cancelSubmit: () => void;
}

const ExportFlowContext = createContext<ExportFlowContextState | null>(null);

const useExportFlowContext = () => {
  const context = useContext(ExportFlowContext);

  if (!context) {
    throw new Error(
      '`useExportFlowContext` must be used within ExportFlowContextProvider'
    );
  }

  return context;
};

const useExportFlowProcessingContext = () => {
  const context = useExportFlowContext();

  const requiredFields = ['submitted', 'startingPoint', 'exportData'] as const;

  requiredFields.forEach((field) => {
    if (!context[field]) {
      throw new Error(
        `useExportFlowProcessingContext requires \`${field}\` to be defined.`
      );
    }
  });

  return context as Omit<
    ExportFlowContextState,
    (typeof requiredFields)[number]
  > &
    Required<
      NonNullableProperties<
        Pick<ExportFlowContextState, (typeof requiredFields)[number]>
      >
    >;
};

const ExportFlowContextProvider = ({
  children,
  startingPoint,
  exportData,
  submitted,
  setStartingPoint,
  clearStartingPoint,
  setExportData,
  clearExportData,
  submit,
  cancelSubmit,
}: PropsWithChildren<ExportFlowContextState>) => {
  const contextValue = useMemo(
    () =>
      ({
        startingPoint,
        exportData,
        submitted,

        setStartingPoint,
        clearStartingPoint,

        setExportData,
        clearExportData,

        submit,
        cancelSubmit,
      }) satisfies ExportFlowContextState,
    [
      startingPoint,
      exportData,
      submitted,
      setStartingPoint,
      clearStartingPoint,
      setExportData,
      clearExportData,
      submit,
      cancelSubmit,
    ]
  );

  return (
    <ExportFlowContext.Provider value={contextValue}>
      {children}
    </ExportFlowContext.Provider>
  );
};

const useFlowControllerModel = () => {
  const [currentStartingPoint, setCurrentStartingPoint] =
    useState<FlowStartingPoint | null>(null);

  const [currentExportData, setCurrentExportData] = useState<ExportData | null>(
    null
  );

  const [currentSubmitted, setCurrentSubmitted] = useState(false);

  const setExportData = useCallback((data: ExportData) => {
    setCurrentExportData(data);
  }, []);

  const clearExportData = useCallback(() => {
    setCurrentExportData(null);
  }, []);

  const submit = useCallback(() => {
    setCurrentSubmitted(true);
  }, []);

  const cancelSubmit = useCallback(() => {
    setCurrentSubmitted(false);
  }, []);

  const setStartingPoint = useCallback((fsp: FlowStartingPoint) => {
    setCurrentStartingPoint(fsp);
  }, []);

  const clearStartingPoint = useCallback(() => {
    cancelSubmit();
    setCurrentStartingPoint(null);
  }, [cancelSubmit]);

  return {
    currentStartingPoint,
    currentExportData,
    currentSubmitted,

    setStartingPoint,
    clearStartingPoint,

    setExportData,
    clearExportData,

    submit,
    cancelSubmit,
  } as const;
};

const ExportFlowController = () => {
  const model = useFlowControllerModel();

  return (
    <ExportFlowContextProvider
      startingPoint={model.currentStartingPoint}
      exportData={model.currentExportData}
      submitted={model.currentSubmitted}
      setStartingPoint={model.setStartingPoint}
      clearStartingPoint={model.clearStartingPoint}
      setExportData={model.setExportData}
      clearExportData={model.clearExportData}
      submit={model.submit}
      cancelSubmit={model.cancelSubmit}
    >
      <ExportFlowNavigator />
    </ExportFlowContextProvider>
  );
};
ExportFlowController.displayName = 'ExportFlowController';

const ExportFlowNavigator = () => {
  const context = useExportFlowContext();

  if (context.submitted) {
    return <ExportFlowProcessingView />;
  }

  if (context.startingPoint) {
    return <ExportFlowView />;
  }

  return <SelectFlowView />;
};

export {
  ExportFlowController,
  useExportFlowContext,
  useExportFlowProcessingContext,
};

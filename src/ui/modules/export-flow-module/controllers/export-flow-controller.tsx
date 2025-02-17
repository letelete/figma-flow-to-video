import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { FlowStartingPoint } from '~/lib/types/flow.types';
import { ExportFlowView } from '~/ui/modules/export-flow-module/views/export-flow-view';
import { SelectFlowView } from '~/ui/modules/export-flow-module/views/select-flow-view';

interface ExportFlowContextState {
  startingPoint: FlowStartingPoint | null;
  setStartingPoint: (fsp: FlowStartingPoint) => void;
  clearStartingPoint: () => void;
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

const ExportFlowContextProvider = ({
  children,
  startingPoint,
  setStartingPoint,
  clearStartingPoint,
}: PropsWithChildren<ExportFlowContextState>) => {
  const contextValue = useMemo(
    () =>
      ({
        startingPoint,
        setStartingPoint,
        clearStartingPoint,
      }) satisfies ExportFlowContextState,
    [clearStartingPoint, setStartingPoint, startingPoint]
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

  const setStartingPoint = useCallback((fsp: FlowStartingPoint) => {
    setCurrentStartingPoint(fsp);
  }, []);

  const clearStartingPoint = useCallback(() => {
    setCurrentStartingPoint(null);
  }, []);

  return {
    currentStartingPoint,
    setStartingPoint,
    clearStartingPoint,
  } as const;
};

const ExportFlowController = () => {
  const model = useFlowControllerModel();

  return (
    <ExportFlowContextProvider
      startingPoint={model.currentStartingPoint}
      setStartingPoint={model.setStartingPoint}
      clearStartingPoint={model.clearStartingPoint}
    >
      {model.currentStartingPoint ? <ExportFlowView /> : <SelectFlowView />}
    </ExportFlowContextProvider>
  );
};
ExportFlowController.displayName = 'ExportFlowController';

export { ExportFlowController, useExportFlowContext };

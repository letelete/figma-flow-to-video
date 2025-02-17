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

export const useExportFlowContext = () => {
  const context = useContext(ExportFlowContext);

  if (!context) {
    throw new Error(
      '`useExportFlowContext` must be used within ExportFlowContextProvider'
    );
  }

  return context;
};

export const ExportFlowContextProvider = ({
  children,
  startingPoint: _startingPoint,
}: PropsWithChildren<Partial<ExportFlowContextState>>) => {
  const [currentStartingPoint, setCurrentStartingPoint] =
    useState<FlowStartingPoint | null>(_startingPoint ?? null);

  const setStartingPoint = useCallback((fsp: FlowStartingPoint) => {
    setCurrentStartingPoint(fsp);
  }, []);

  const clearStartingPoint = useCallback(() => {
    setCurrentStartingPoint(null);
  }, []);

  const contextValue = useMemo(
    () =>
      ({
        startingPoint: currentStartingPoint,
        setStartingPoint,
        clearStartingPoint,
      }) satisfies ExportFlowContextState,
    [clearStartingPoint, currentStartingPoint, setStartingPoint]
  );

  return (
    <ExportFlowContext.Provider value={contextValue}>
      {children}
    </ExportFlowContext.Provider>
  );
};

const ExportFlowController = () => {
  const context = useExportFlowContext();

  if (context.startingPoint === null) {
    return <SelectFlowView />;
  }

  return <ExportFlowView />;
};
ExportFlowController.displayName = 'ExportFlowController';

export { ExportFlowController };

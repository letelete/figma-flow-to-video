import {
  ExportFlowContextProvider,
  ExportFlowController,
} from '~/ui/modules/export-flow-module/controllers/export-flow-controller';

const App: React.FC = () => {
  return (
    <div>
      <ExportFlowContextProvider>
        <ExportFlowController />
      </ExportFlowContextProvider>
    </div>
  );
};

export default App;

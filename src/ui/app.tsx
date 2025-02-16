import React from 'react';
import '../i18n/config';
import { SelectFlowView } from './views/select-flow-view/select-flow-view';
import './styles.css';

const App: React.FC = () => {
  return (
    <div>
      <SelectFlowView />
    </div>
  );
};

export default App;

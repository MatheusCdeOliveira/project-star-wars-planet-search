import React from 'react';
import './App.css';
import PlanetTable from './components/PlanetTable';

import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <PlanetTable />
      <span>Hello, App!</span>
    </Provider>
  );
}

export default App;

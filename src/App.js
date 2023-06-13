import React from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Route, Routes} from 'react-router-dom';
import Rutas from './routes/Routes';

function App() {
  return (
    <Routes>
      <Route path='/*' element={<Rutas />} />
    </Routes>
  );
}

export default App;

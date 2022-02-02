import React from 'react';
import Navegacion  from './Navegacion';
import Portada from './Portada';
import Sms from './Sms';
import Politicas from './Politicas';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Rutas = () => {
  return <div>
      <>

      <Navegacion />
      <Portada />
      <Sms />

    

        <Router>
            <Routes>
                <Route exact path="/Politicas" element={<Politicas />} />
            </Routes>
        </Router>
      </>
  </div>;
};

export default Rutas;




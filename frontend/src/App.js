import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Inicio } from './pages/Inicio.tsx';
import { RegistrarCajaOBanco } from './pages/RegisterBank/RegistrarCajaOBanco.tsx';
import { RegistrarIngresosFuturos } from './pages/RegisterPay/RegistrarIngresosFuturos.tsx';
import { RegistrarEgresosFuturos } from './pages/RegisterDischargeCash/RegistrarEgresosFuturos.tsx';
import { Home } from './pages/Home.tsx';
import { Recovery } from './pages/RecoveryLogin/Recovery.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route exact path='/' element={<Inicio />}/>
          <Route exact path='/Home' element={<Home />}/>
          <Route exact path='/Registrar-caja-o-banco' element={<RegistrarCajaOBanco />}/>
          <Route exact path='/Registrar-ingresos-futuros' element={<RegistrarIngresosFuturos />}/>
          <Route exact path='/Registrar-egresos-futuros' element={<RegistrarEgresosFuturos />}/>
          <Route exact path='/Recovery-pass' element={<Recovery/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

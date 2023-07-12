import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Inicio } from './pages/Inicio.tsx';
import { RegistrarCajaOBanco } from './pages/RegistrarCajaOBanco.tsx';
import { RegistrarIngresosFuturos } from './pages/RegistrarIngresosFuturos.tsx';
import { RegistrarEgresosFuturos } from './pages/RegistrarEgresosFuturos.tsx';
import { Home } from './pages/Home.tsx';

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

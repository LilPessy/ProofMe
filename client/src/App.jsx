import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Registrazione from './pages/Registrazione';
import HomeLogin from './pages/HomeLogin';
import './App.css';
import Certificato from './pages/Certificato';

function App() {
  return (
    // 1. BrowserRouter avvolge tutta l'app
    <BrowserRouter>
      
      {/* 2. Routes contiene l'elenco delle possibili strade */}
      <Routes>
        
        {/* 3. Ogni Route dice: "Se l'URL è questo, mostra questo componente" */}
        <Route path="/" element={<HomeLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Registrazione/>} />
        <Route path="/certificato" element={<Certificato/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
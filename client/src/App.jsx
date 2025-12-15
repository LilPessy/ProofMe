import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Registrazione from './pages/Registrazione';
import './App.css';

function App() {
  return (
    // 1. BrowserRouter avvolge tutta l'app
    <BrowserRouter>
      
      {/* 2. Routes contiene l'elenco delle possibili strade */}
      <Routes>
        
        {/* 3. Ogni Route dice: "Se l'URL è questo, mostra questo componente" */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Registrazione/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
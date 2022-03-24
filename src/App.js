import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import PokemonDetail from './pages/PokemonDetail';

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:pokemonid" element={<PokemonDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

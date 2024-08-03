import './styles/App.css';
import { GetStarted } from './pages/GetStarted';
import { Home } from './pages/Home';
import { TempAIPage } from './pages/TempAIPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/getInfo" element={<getInfo />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tempai" element={<TempAIPage/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

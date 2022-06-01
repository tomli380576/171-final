import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PredictionPage } from './PredictionPage';
import { Home } from './home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />

          <Route path='prediction' element={<PredictionPage />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App

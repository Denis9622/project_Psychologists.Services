import { Routes, Route } from 'react-router-dom';
import Container from './Container/Container';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import SignIn from './Sign/Sign';
import SignUp from '../components/SignUp/SignUp';
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Container />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
}

export default App;

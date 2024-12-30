import { Routes, Route } from 'react-router-dom';
import Container from './Container/Container';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import CamperDetailPage from '../pages/CamperDetailPage/CamperDetailPage';
import SignIn from './S/S';
import SignUp from '../components/SignUp/SignUp';
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Container />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/:id" element={<CamperDetailPage />} />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
}

export default App;

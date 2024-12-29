import { Routes, Route } from 'react-router-dom';
import Container from './Container/Container';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import CamperDetailPage from '../pages/CamperDetailPage/CamperDetailPage';
import SignIn from './SignIn/Signin';
import SignUp from '../components/SignUp/SignUp';
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage'; // Импортируем страницу избранных

function App() {
  return (
    <>
      <Routes>
        {/* Основные страницы */}
        <Route path="/" element={<Container />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailPage />} />

        {/* Страницы для регистрации и авторизации */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Страница избранных психологов, доступна только для авторизованных пользователей */}
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;

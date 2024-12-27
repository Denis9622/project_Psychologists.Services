import { Routes, Route } from 'react-router-dom';
import Container from './Container/Container';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import CamperDetailPage from '../pages/CamperDetailPage/CamperDetailPage';
import SignIn from '../components/Signin/SignIn';
import SignUp from '../components/SignUp/SignUp';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailPage />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;

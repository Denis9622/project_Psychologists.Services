// CamperDetailPage.jsx
import  { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperDetails } from '../redux/vehiclesSlice';
import Loader from '../components/Loader';

function CamperDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { camper, loading } = useSelector(state => state.vehicles);

  useEffect(() => {
    dispatch(fetchCamperDetails(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;

  if (!camper) return <p>Camper not found</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{camper.name}</h1>
      <img src={camper.image} alt={camper.name} style={{ maxWidth: '100%' }} />
      <h2>Характеристики</h2>
      <ul>
        <li>Transmission: {camper.transmission}</li>
        <li>Engine: {camper.engine}</li>
        <li>AC: {camper.AC ? 'Yes' : 'No'}</li>
        {/* Додайте інші характеристики за потреби */}
      </ul>
      <h2>Деталі</h2>
      <ul>
        <li>Length: {camper.length}</li>
        <li>Width: {camper.width}</li>
        <li>Height: {camper.height}</li>
        {/* Додайте інші деталі за потреби */}
      </ul>

      <h2>Відгуки</h2>
      {camper.reviews ? (
        camper.reviews.map((review, index) => (
          <div key={index}>
            <p>Рейтинг: {review.rating} / 5</p>
            <p>Коментар: {review.comment}</p>
          </div>
        ))
      ) : (
        <p>Немає відгуків</p>
      )}

      <h2>Бронювання</h2>
      <form onSubmit={e => e.preventDefault()}>
        <label>
          Дата бронювання:
          <input type="date" required />
        </label>
        <br />
        <label>
          Контактний номер:
          <input type="tel" required />
        </label>
        <br />
        <button
          type="submit"
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Забронювати
        </button>
      </form>
    </div>
  );
}

export default CamperDetailPage;

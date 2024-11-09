// Card.jsx
import { useNavigate } from 'react-router-dom';

const Card = ({ camper }) => {
  const navigate = useNavigate();

  // Деструктуризація даних кемпера для зручності
  const { id, name, image, price, description } = camper;

  return (
    <div style={styles.card}>
      <img src={image} alt={name} style={styles.image} />
      <div style={styles.content}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p style={styles.price}>Ціна: {price.toFixed(2)} UAH</p>
        <button
          onClick={() => navigate(`/catalog/${id}`)}
          style={styles.button}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

// Стилі для компоненту Card
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  content: {
    padding: '15px',
  },
  price: {
    fontWeight: 'bold',
    color: '#3498db',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Card;

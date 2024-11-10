import { useState } from 'react';
import styles from './Filters.module.css';
import MapIcon from '/public/images/Map.svg';
import AcIcon from '/public/images/ac.svg';
import AutomaticIcon from '/public/images/automatic.svg';
import KitchenIcon from '/public/images/kitchen.svg';
import TvIcon from '/public/images/tv.svg';
import BathroomIcon from '/public/images/bathroom.svg';
import VanIcon from '/public/images/van.svg';
import IntegratedIcon from '/public/images/integrated.svg';
import AlcoveIcon from '/public/images/alcove.svg';

function Filters({ onApplyFilters }) {
  const [location, setLocation] = useState('');
  const [features, setFeatures] = useState({
    ac: false,
    automatic: false,
    kitchen: false,
    tv: false,
    bathroom: false,
  });
  const [vehicleType, setVehicleType] = useState({
    van: false,
    integrated: false,
    alcove: false,
  });

  // Обработчик для изменения состояния Vehicle Equipment
  const handleFeatureChange = e => {
    const { name, checked } = e.target;
    setFeatures(prev => ({ ...prev, [name]: checked }));
  };

  // Обработчик для изменения состояния Vehicle Type
  const handleVehicleTypeChange = e => {
    const { name, checked } = e.target;
    setVehicleType(prev => ({ ...prev, [name]: checked }));
  };

  // Функция для применения фильтров
  const applyFilters = () => {
    const activeFilters = {
      location,
      features: Object.keys(features).filter(key => features[key]),
      vehicleType: Object.keys(vehicleType).filter(key => vehicleType[key]),
    };
    onApplyFilters(activeFilters); // Передаем только активные фильтры
  };

  const featureIcons = {
    ac: <img src={AcIcon} alt="AC" className={styles.slotIcon} />,
    automatic: (
      <img src={AutomaticIcon} alt="Automatic" className={styles.slotIcon} />
    ),
    kitchen: (
      <img src={KitchenIcon} alt="Kitchen" className={styles.slotIcon} />
    ),
    tv: <img src={TvIcon} alt="TV" className={styles.slotIcon} />,
    bathroom: (
      <img src={BathroomIcon} alt="Bathroom" className={styles.slotIcon} />
    ),
  };

  const vehicleTypeIcons = {
    van: <img src={VanIcon} alt="Van" className={styles.slotIcon} />,
    integrated: (
      <img
        src={IntegratedIcon}
        alt="Fully Integrated"
        className={styles.slotIcon}
      />
    ),
    alcove: <img src={AlcoveIcon} alt="Alcove" className={styles.slotIcon} />,
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterSection}>
        <label className={styles.subtitleone}>Location</label>
        <div className={styles.inputContainer}>
          <img src={MapIcon} alt="Map icon" className={styles.icon} />
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Kyiv, Ukraine"
            className={styles.input}
          />
        </div>
      </div>

      <div className={`${styles.filterSection} ${styles.equipmentSection}`}>
        <h2 className={styles.subtitleh2}>Filters</h2>
        <label className={styles.subtitle}>Vehicle Equipment</label>
        <div className={styles.slotContainer}>
          {Object.keys(features).map(feature => (
            <label
              key={feature}
              className={`${styles.slot} ${
                features[feature] ? styles.activeSlot : ''
              }`}
            >
              <input
                type="checkbox"
                name={feature}
                checked={features[feature]}
                onChange={handleFeatureChange}
                className={styles.checkbox}
              />
              {featureIcons[feature]}
              <span className={styles.slotLabel}>
                {feature.charAt(0).toUpperCase() + feature.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.subtitle}>Vehicle Type</label>
        <div className={styles.slotContainer}>
          {Object.keys(vehicleType).map(type => (
            <label
              key={type}
              className={`${styles.slot} ${
                vehicleType[type] ? styles.activeSlot : ''
              }`}
            >
              <input
                type="checkbox"
                name={type}
                checked={vehicleType[type]}
                onChange={handleVehicleTypeChange}
                className={styles.checkbox}
              />
              {vehicleTypeIcons[type]}
              <span className={styles.slotLabel}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button onClick={applyFilters} className={styles.applyButton}>
        Search
      </button>
    </div>
  );
}

export default Filters;

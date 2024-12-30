import styles from './Filters.module.css';

function Filter({ sortOption, handleSortChange }) {
  return (
    <div className={styles.filterContainer}>
      <h1 className={styles.filterh1}>Filters</h1>
      <select
        value={sortOption}
        onChange={handleSortChange}
        className={styles.sortSelect}
      >
        <option value="alphabetical-asc">A to Z</option>
        <option value="alphabetical-desc">Z to A</option>
        <option value="price-asc">Less than 10$</option>
        <option value="price-desc">Greater than 10$</option>
        <option value="popularity-asc">Not popular</option>
        <option value="popularity-desc">Popular</option>
        <option value="show-all">Show all</option>
      </select>
    </div>
  );
}

export default Filter;

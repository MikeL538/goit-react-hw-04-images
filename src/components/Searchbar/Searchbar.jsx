import { useState } from 'react';
import css from './Searchbar.module.scss';

export const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  function search(e) {
    e.preventDefault();
    onSearch(searchTerm);
  }

  function clearInput() {
    setTimeout(() => {
      setSearchTerm('');
    }, 0);
  }

  return (
    <header>
      <form className={css.form} onSubmit={search}>
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          placeholder="Search images and photos"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={clearInput} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

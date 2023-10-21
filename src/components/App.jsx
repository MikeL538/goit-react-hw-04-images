import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('galaxy');
  const [page, setPage] = useState(1);

  const handleSearch = term => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Searchbar onSearch={handleSearch} />
      <ImageGallery searchTerm={searchTerm} page={page} />
      <LoadMoreButton onLoadMore={handleLoadMore} />
    </>
  );
};

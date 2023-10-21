import { useEffect, useState, useCallback } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Spinner } from 'components/Loader/Loader';
import axios from 'axios';

export const ImageGalleryItem = ({ searchTerm, page }) => {
  const ApiKey = process.env.REACT_APP_ApiKey;
  const [images, setImages] = useState([]);
  const [siteLoaded, setSiteLoaded] = useState(false);

  const fetchImageData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchTerm}&page=${page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`
      );
      setImages(prevImages => {
        if (!siteLoaded) {
          setSiteLoaded(true);
          return [...response.data.hits];
        }
        return [...prevImages, ...response.data.hits];
      });
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  }, [searchTerm, page, siteLoaded, ApiKey]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm && page === 1) {
        setImages([]);
      }
      await fetchImageData();
    };

    fetchData();
  }, [searchTerm, page, fetchImageData]);

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const handleImageClick = imageUrl => {
    setSelectedImageUrl(imageUrl);
  };

  return (
    <>
      {images.length === 0 && <Spinner />}

      {images.map(img => (
        <li key={img.id}>
          <button onClick={() => handleImageClick(img.largeImageURL)}>
            <img src={img.webformatURL} alt={img.tags} loading="lazy" />
          </button>
          <div>
            <p>
              <b>Likes</b>
              <br /> {img.likes}
            </p>
            <p>
              <b>Views</b>
              <br /> {img.views}
            </p>
            <p>
              <b>Comments</b>
              <br /> {img.comments}
            </p>
            <p>
              <b>Downloads</b>
              <br /> {img.downloads}
            </p>
          </div>
        </li>
      ))}

      {selectedImageUrl && (
        <Modal
          imageUrl={selectedImageUrl}
          onClose={() => setSelectedImageUrl(null)}
        />
      )}
    </>
  );
};

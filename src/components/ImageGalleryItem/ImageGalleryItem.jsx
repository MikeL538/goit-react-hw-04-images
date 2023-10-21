import { useEffect, useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Spinner } from 'components/Loader/Loader';
import axios from 'axios';

export const ImageGalleryItem = ({ searchTerm, page }) => {
  const ApiKey = process.env.REACT_APP_ApiKey;
  const [images, setImages] = useState([]);
  const [siteLoaded, setSiteLoaded] = useState(false);

  const fetchImageData = async () => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchTerm}&page=${page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`
      );
      setImages(prevImages => {
        // Prevent double images load from page 1 after website loads
        if (!siteLoaded) {
          setSiteLoaded(true);
          return [...response.data.hits];
        }
        // If loaded and Load More button clicked
        return [...prevImages, ...response.data.hits];
      });
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };

  useEffect(() => {
    if (searchTerm && page === 1) {
      // Clear the images only when a new search is performed
      setImages([]);
    }

    fetchImageData();
  }, [searchTerm, page]);

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const handleImageClick = imageUrl => {
    setSelectedImageUrl(imageUrl);
  };

  return (
    <>
      {images.length === 0 && <Spinner />}

      {images.map(img => (
        <li key={img.id}>
          {/* Czy tutaj lepiej żeby było <a> czy może <button>? A może coś jeszcze innego?
          Jeśli <a> to czy coś dawać w href by eslint nie pokazywał błędu czy zigonorować? */}
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

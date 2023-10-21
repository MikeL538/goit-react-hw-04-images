import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.scss';

export const ImageGallery = ({ searchTerm, page }) => {
  return (
    <ul className={css.imageGalleryList}>
      <ImageGalleryItem searchTerm={searchTerm} page={page} />
    </ul>
  );
};

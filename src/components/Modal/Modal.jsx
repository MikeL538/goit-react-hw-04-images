import { useEffect } from 'react';
import css from './Modal.module.scss';

export const Modal = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <div className={css.modal} onClick={onClose}>
        <img className={css.modalImage} src={imageUrl} alt="" />
      </div>
    </>
  );
};

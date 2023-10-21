import css from './LoadMoreButton.module.scss';

export const LoadMoreButton = ({ onLoadMore }) => {
  function handleLoadMore() {
    onLoadMore();
  }

  return (
    <button onClick={handleLoadMore} className={css.LoadMoreBtn}>
      Load More Images
    </button>
  );
};

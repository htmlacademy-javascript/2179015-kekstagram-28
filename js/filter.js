const PICTURES_COUNT = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersFormElement = document.querySelector('.img-filters__form');
const sortButtonElement = filtersFormElement.querySelectorAll('.img-filters__button');
const filtersElement = document.querySelector('.img-filters');

let pictures = [];
let currentFilter = Filters.DEFAULT;

const getrandomSort = () => Math.random() - 0.5;

const getdiscussedSort = (a, b) => b.comments.length - a.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filters.RANDOM:
      return [...pictures].sort(getrandomSort).slice(0, PICTURES_COUNT);
    case Filters.DISCUSSED:
      return [...pictures].sort(getdiscussedSort);
    default:
      return [...pictures];
  }
};

const init = (loadedPictures) => {
  filtersElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];

  filtersFormElement.addEventListener('click', (evt) => {
    sortButtonElement.forEach((item) => item.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
  });
};

export { init, getFilteredPictures };

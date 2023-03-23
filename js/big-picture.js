const bigPictures = document.content.querySelector('.big-picture');

const createBigPictures = ({ comments, description, likes, url, id }) => {
  const thumbnail = bigPictures.cloneNode(true);

  thumbnail.querySelector('.big-picture__img').src = url;
  thumbnail.querySelector('.social__caption').alt = description;
  thumbnail.querySelector('.social__comments').textContent = comments.length;
  thumbnail.querySelector('.likes-count').textContent = likes;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

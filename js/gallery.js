import { isEscapeKey } from './util.js';
import { data } from './data.js';
import { createBigPicture } from './big-picture.js';

const bigPhoto = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const bigPictureCloseBtn = bigPhoto.querySelector('.big-picture__cancel');
const bodyContainer = document.querySelector('body');
//const commentCount = document.querySelector('.social__comment-count');
//const commentsLoader = document.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal () {
  bigPhoto.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  bodyContainer.classList.add('modal-open');
  //commentCount.classList.add('hidden');
  //commentsLoader.classList.add('hidden');
}

function closeUserModal () {
  bigPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyContainer.classList.remove('modal-open');

}

const onPicturesContainerClick = (evt) => {
  const id = evt.target.parentNode.dataset.thumbnailId;
  const pictureData = data.find((thumbnail) => thumbnail.id === Number(id));

  createBigPicture(pictureData);
  openUserModal();
};

const closeBigPhoto = () => {
  closeUserModal();
};

picturesContainer.addEventListener('click', onPicturesContainerClick);
bigPictureCloseBtn.addEventListener('click', closeBigPhoto);


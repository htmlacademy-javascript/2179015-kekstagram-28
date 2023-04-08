import { isEscapeKey } from './util.js';
import { createBigPicture } from './big-picture.js';

const bigPhoto = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const bigPictureCloseBtn = bigPhoto.querySelector('.big-picture__cancel');
const bodyContainer = document.querySelector('body');

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
}

function closeUserModal () {
  bigPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyContainer.classList.remove('modal-open');

}

const onPicturesContainerClick = (evt, data) => {
  const id = evt.target.parentNode.dataset.thumbnailId;
  if (!id) {
    return;
  }
  const pictureData = data.find((thumbnail) => thumbnail.id === Number(id));

  createBigPicture(pictureData);
  openUserModal();
};

const closeBigPhoto = () => {
  closeUserModal();
};

function bindThumbnailsListeners(data) {
  picturesContainer.addEventListener('click', (evt) =>
    onPicturesContainerClick(evt, data)
  );

  bigPictureCloseBtn.addEventListener('click', closeBigPhoto);
}

export { bindThumbnailsListeners };

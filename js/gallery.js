import { isEscapeKey } from './util.js';

const userModalElement = document.querySelector('.big-picture');
const userModalOpenElement = document.querySelector('.pictures');
const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal () {
  userModalElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal () {
  userModalElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

userModalOpenElement.addEventListener('click', () => {
  openUserModal();
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});



import { isEscapeKey } from './util.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-za-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';
const overlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const bodyContainer = document.querySelector('body');
const hashtagField = document.querySelector('text__hashtags');
//const commentField = document.querySelector('text__description');
const fileField = document.querySelector('#upload-file');
const cancelForm = document.querySelector('#upload-cancel');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

/*
commentField.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

commentField.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

hashtagField.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

hashtagField.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});
*/

const openUserModal = () => {
  overlay.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUserModal () {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  bodyContainer.classList.remove('modal-open');
}

const closeForm = () => {
  closeUserModal();
};

const onFileInputChange = () => {
  openUserModal();
};

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split('')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  TAG_ERROR_TEXT
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileField.addEventListener('change', onFileInputChange);
cancelForm.addEventListener('click', closeForm);
form.addEventListener('submit', onFormSubmit);


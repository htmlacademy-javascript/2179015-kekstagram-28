import { resetEffects } from './effect.js';
import { resetScale } from './scale.js';
import { isEscapeKey } from './util.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-za-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Хэш-тег должен начинаеться с символа # и не может содержать пробелы, $, %, &. Максимальная длина хэш-тега 20 символов. Нельзя указывать более 5 хэш-тегов. Хэш-тег не должен повторяться';

const overlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const bodyContainer = document.querySelector('body');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const fileField = document.querySelector('#upload-file');
const cancelForm = document.querySelector('#upload-cancel');
const uploadSubmitElement = document.querySelector('.img-upload__submit');
const elementDescription = form.querySelector('.text__description');

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

const openUserModal = () => {
  overlay.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUserModal () {
  form.reset();
  resetScale();
  resetEffects();
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
  if (!value) {
    return true;
  }
  const tags = value.trim().split(' ');

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

const blockSubmitButton = () => {
  uploadSubmitElement.disabled = true;
  elementDescription.readOnly = true;
};

const unblockSubmitButton = () => {
  uploadSubmitElement.disabled = false;
  elementDescription.readOnly = false;
};

const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isVlid = pristine.validate();

    if (isVlid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

fileField.addEventListener('change', onFileInputChange);
cancelForm.addEventListener('click', closeForm);
form.addEventListener('submit', onFormSubmit);

export { setOnFormSubmit, closeForm, onDocumentKeydown };

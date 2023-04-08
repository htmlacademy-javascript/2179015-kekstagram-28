import './form.js';
import { bindThumbnailsListeners } from './gallery.js';
import { renderThumbnails } from './thumbnail.js';
import { getData, sendData } from './api.js';
import { debounce, showAlert } from './util.js';
import { setOnFormSubmit, closeForm } from './form.js';
import { showSuccesMessage, showErrowMessage } from './messages.js';
import { init, getFilteredPictures } from './filter.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeForm();
    showSuccesMessage();
  } catch {
    showErrowMessage();
  }
});

try {
  const data = await getData();
  const debounceRenderGallery = debounce(renderThumbnails);
  init(data, debounceRenderGallery);
  renderThumbnails(getFilteredPictures());
  bindThumbnailsListeners(getFilteredPictures());
} catch (err) {
  showAlert(err.message);
}

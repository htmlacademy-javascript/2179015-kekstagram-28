import './form.js';
import { bindThumbnailsListeners } from './gallery.js';
import { renderThumbnails } from './thumbnail.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { setOnFormSubmit, closeForm } from './form.js';
import { showSuccesMessage, showErrowMessage } from './messages.js';

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
  renderThumbnails(data);
  bindThumbnailsListeners(data);
} catch (err) {
  showAlert(err.message);
}

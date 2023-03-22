import { getPictures } from './data.js';
import './gallery.js';
import { renderThumbnails } from './thumbnail.js';

renderThumbnails(getPictures(25));

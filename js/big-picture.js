import { comment } from './data.js';
const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');

const renderComment = ({ avatar, name, message}) => {
  const commentItem = commentTemplate.cloneNode(true);
  commentItem.querySelector('social__picture').src = avatar;
  commentItem.querySelector('social__picture').alt = name;
  commentItem.querySelector('social__text').textContent = message;

  return commentItem;
};

const createCommentList = (comments) => {
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach((commentItem) => {
    commentsListFragment.append(renderComment(commentItem));
  });
  commentsContainer.append(commentsListFragment);
};

const createBigPicture = (pictureObject) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = `${pictureObject.url}`;
  bigPicture.querySelector('.big-picture__img').querySelector('img').alt = pictureObject.description;
  bigPicture.querySelector('.likes-count').textContent = pictureObject.likes;
  bigPicture.querySelector('.comments-count').textContent = pictureObject.comments;
  commentsContainer.innerHTML = '';
  createCommentList(comment);
};

export { createBigPicture };

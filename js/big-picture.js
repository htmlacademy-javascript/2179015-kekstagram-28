import { comment } from './data.js';
const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const COMMENTS_PER_PORTION = 5;
let commentsShown = 0;

const createComment = ({ avatar, name, message }) => {
  const commentItem = commentTemplate.cloneNode(true);
  commentItem.querySelector('.social__picture').src = avatar;
  commentItem.querySelector('.social__picture').alt = name;
  commentItem.querySelector('.social__text').textContent = message;

  return commentItem;
};

const renderCommentList = (comments) => {

  commentsShown += COMMENTS_PER_PORTION;
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }
  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
  commentCount.inner = `${commentsShown} из ${comments.length} комментариев`;
  commentsLoader.addEventListener('click', renderCommentList);
};

const loadComment = () => commentsLoader.addEventListener('click', renderCommentList);

/*const commentsListFragment = document.createDocumentFragment();
  comments.forEach((commentItem) => {
    commentsListFragment.append(createComment(commentItem));
  });

  commentsContainer.append(commentsListFragment);
};*/

const createBigPicture = (pictureObject) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureObject.url;
  bigPicture.querySelector('.social__caption').textContent = pictureObject.description;
  bigPicture.querySelector('.likes-count').textContent = pictureObject.likes;
  bigPicture.querySelector('.comments-count').textContent = pictureObject.comments.length;
  commentsContainer.innerHTML = '';
  renderCommentList(comment);
  commentsShown = 0;
  loadComment();
};

export { createBigPicture };

const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const createComment = ({ avatar, name, message }) => {
  const commentItem = commentTemplate.cloneNode(true);
  commentItem.querySelector('.social__picture').src = avatar;
  commentItem.querySelector('.social__picture').alt = name;
  commentItem.querySelector('.social__text').textContent = message;

  return commentItem;
};

const renderCommentsCounter = (loadedComments, totalComments) => {
  commentCount.textContent = `${loadedComments} из ${totalComments} комментариев`;

  if (loadedComments === totalComments) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const renderCommentList = (comments) => {
  commentsContainer.innerHTML = '';

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  commentsContainer.append(fragment);
};

const createBigPicture = ({ url, description, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;

  const initialComments = comments.slice(0, COMMENTS_PER_PORTION);

  let step = 1;
  renderCommentsCounter(initialComments.length, comments.length);
  renderCommentList(initialComments);

  const onCommentsLoaderClick = () => {
    step = step + 1;
    const restComments = comments.slice(0, step * COMMENTS_PER_PORTION);
    renderCommentsCounter(restComments.length, comments.length);
    renderCommentList(restComments);
  };

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export { createBigPicture };

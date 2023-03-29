import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 20;
const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Пляж нашего отеля',
  'Проход на пляж',
  'Райский остров',
  'Пока я фотографирую, фотографируют меня)',
  'Два веселых супчика',
  'Авто мечты',
  'Завтрак)',
  'Витаминный чай, чтобы не болеть',
  'Встречаем самолеты',
  'Функциональная обувница',
  'Наш маршрут к морю',
  'Мечты должны сбываться!',
  'Ужин для тех, кто на диете',
  'Котосуши)',
  'Тапки, которые не хочется снимать',
  'Выше облаков',
  'Как же круто они пели!',
  'Ретро тачка',
  'Чтобы не споткнуться в темноте',
  'Вечерний променад',
  'Легкий ужин',
  'Провожаю день',
  'В мире животных',
  'Я надолго запомню этот концерт',
  'Приехал в гости',
];
const NAMES = [
  'Александр',
  'Наталья',
  'Мария',
  'Иван',
  'Ольга',
  'Андрей',
];

const generateCommentId = createIdGenerator();

const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () =>
    getRandomArrayElement(COMMENT_LINES)
  ).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

export const comment = Array.from(
  { length: getRandomInteger(0, COMMENT_COUNT) },
  createComment
);

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: comment,
});

const getPictures = () =>
  Array.from({ length: PICTURE_COUNT }, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );

const data = getPictures(25);


export { data };

/* eslint-disable max-len */
import { Issue } from '../types/common';

const mockIssuesGame: Issue[] = [
  {
    id: '0',
    title: 'UI',
    desc: 'вёрстка, дизайн, UI страницы приветствия +5;\n вёрстка, дизайн, UI страницы с настройками +5;\n вёрстка, дизайн, UI страницы с игрой +5;\n оригинальный интересный качественный дизайн приложения +10',
  },
  {
    id: '1',
    title: 'MainPage',
    desc: 'Попап с информацией о пользователе +10; присоединиться/начать игру +5; валидация id игры, имени пользователя +5',
  },
  {
    id: '2',
    title: 'Lobby +110',
    desc: 'cтраница лобби и вся логика, связанная с лобби(в том часле на странице с настройками) +50; исключить участника голосованием +10; чат +50',
  },
  {
    id: '3',
    title: 'Setting +35',
    desc: '<p>валидация настроек +5;</p><p>сохранение базовых настроек +10;</p><p>создание списка задач вручную (каждую задачу добавляем отдельно по очереди) +10;</p><p>генерация списка задач на основе файла +10</p>',
  },
  {
    id: '4',
    title: 'GamePage +160',
    desc: '<p>список участников +10;</p><p>cписок задач +25;</p><p>таймер +5;</p><p>среднее значение +5;</p><p>механизм голосования +50;</p><p>карточки переворачиваются автоматически, когда проголосовали все +5;</p><p>повторное голосование +5;</p><p>добавление задач во время игры +10;</p><p>выводится результат в конце игры +5;</p><p>результат игры можно скачать +40</p>',
  },
  {
    id: '5',
    title: 'Бекенд +70',
    desc: '<p>поддерживает игровую сессию с несколькими пользователями +30;</p><p>поддерживает несколько игровых сессий одновременно +30;</p><p>сервер отдаёт корректные ответы, отдаёт HTTP ошибки с нормальными body, по которым можно понять, что произошло, пишет читаемые логи +10;</p>',
  },
  {
    id: '6',
    title: 'Доп +30',
    desc: '<p>реализован не указанный в задании дополнительный функционал. Оценивается оригинальная идея, вклад в улучшение качества приложения, полезность, сложность и качество выполнения +20;</p><p>написано не меньше 10 юнит-тестов, использующих различные методы jest +10</p>',
  },
];

export default mockIssuesGame;

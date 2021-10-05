import { KICKED_MESSAGES, ROLES, Member } from '../types/common';

const mockRoom = '1234567';

const mockCurrentUser: Member = {
  userId: '11112',
  firstName: 'Devid',
  lastName: 'Blain',
  role: ROLES.USER,
};

// const mockCurrentUser: Member = {
//   userId: '11111',
//   firstName: 'Stephan',
//   lastName: 'Nazarenko',
//   role: ROLES.ADMIN,
// };

const mockCurrentAdmin: Member = {
  userId: '11111',
  firstName: 'Stephan',
  lastName: 'Nazarenko',
  role: ROLES.ADMIN,
};

const mockWhoWillBeKicked = {
  userId: '613f47f975620a3ac1d9cf79',
  firstName: 'User firstName1',
  lastName: 'User lastName1',
  role: 'user',
};

const mockChat = [
  {
    userId: '11111',
    firstName: 'Stephan',
    lastName: 'Nazarenko',
    role: ROLES.ADMIN,
    message: 'Hi :)',
  },
  {
    userId: '11112',
    firstName: 'Devid',
    lastName: 'Blain',
    role: ROLES.USER,
    message: 'Hello everyone!',
  },
  {
    userId: '11113',
    firstName: 'Den',
    lastName: '',
    role: ROLES.USER,
    message: 'Hi. Hi. What do you think about our issue 123?',
  },
  {
    userId: '11111',
    firstName: 'Stephan',
    lastName: 'Nazarenko',
    role: ROLES.ADMIN,
    message: "Guys, let's talk about it in the game",
  },
  {
    userId: '11115',
    firstName: 'Teodor',
    lastName: 'Ferdyshcenko',
    role: ROLES.OBSERVER,
    message: 'Ok',
  },
  { userId: '11116', firstName: 'Bob', lastName: 'Blain', role: ROLES.USER, message: 'Hi :)' },
  {
    userId: '11116',
    firstName: 'Bob',
    lastName: 'Blain',
    role: ROLES.USER,
    message: KICKED_MESSAGES.BY_ADMIN,
    type: 'kick',
  },
  {
    userId: '11116',
    firstName: 'Bob',
    lastName: 'Blain',
    role: ROLES.USER,
    message: KICKED_MESSAGES.BY_VOTING,
    type: 'kick',
  },
];

const mockKickMessage = {
  userId: '11116',
  firstName: 'Bob',
  lastName: 'Blain',
  role: ROLES.USER,
  message: KICKED_MESSAGES.BY_VOTING,
  type: 'kick',
};

// export { mockChat, mockCurrentAdmin, mockCurrentUser, mockKickMessage, mockWhoWillBeKicked, mockRoom };

import { ROLES } from '../types/common';

const mockRoom = {
  room: 'room_t3wWKYcSCd4y2feAAAh',
  users: [
    {
      userId: '_t3wWKYcSCd4y2feAAAh',
      firstName: 'Devid',
      lastName: 'Blain',
      role: ROLES.ADMIN,
    },
    {
      userId: 'Fr-SXZ4JKP8ptB4nAAAj',
      firstName: 'Den',
      lastName: '',
      role: ROLES.USER,
    },
    {
      userId: 'cJaeO6z9I-Wjqe6WAAAr',
      firstName: 'Stephan',
      lastName: 'Naz',
      role: ROLES.USER,
    },
    {
      userId: 'ZHXIKPoqHvhP7DNLAAAn',
      firstName: 'Teodor',
      lastName: 'Ferdyshcenkov',
      role: ROLES.OBSERVER,
    },
  ],
  issues: [{ issueId: '1' }, { issueId: '2' }, { issueId: '3' }],
  cards: [{ value: 'coffetime' }, { value: 0 }, { value: 1 }, { value: 5 }, { value: 10 }, { value: 20 }],
};

export default mockRoom;

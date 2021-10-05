import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';

import { store } from '../../redux/store';
import CardGameLobby from './CardGameLobby';

const minValue = 0;
const maxValue = 1000;
const cardInit = { id: '0', value: '10' };

describe('CardGameLobby component tests', () => {
  const wrapper = render(
    <Provider store={store}>
      <CardGameLobby card={cardInit} minValue={minValue} maxValue={maxValue} isNew />
    </Provider>,
  );

  const img = wrapper.find('img');

  it('Renders correctly initial document', () => {
    expect(img).toHaveLength(1);
  });
});

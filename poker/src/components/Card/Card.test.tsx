import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'enzyme';

import Card from './Card';
import { store } from '../../redux/store';
import { SIZES } from '../../types/common';

const cardInit = { id: '0', value: '10' };

describe('Card', () => {
  const wrapper = render(
    <Provider store={store}>
      <Card card={cardInit} isShowCards={true} size={SIZES.SMALL} />
    </Provider>,
  );

  it('should render text in paragraph equal cardInit.value', () => {
    const p = wrapper.find('p');
    const pInnerText = p.first().text();
    expect(pInnerText).toEqual(cardInit.value);
  });

  it('should render text in title Card equal storyTypeShort from settings game', () => {
    const h3 = wrapper.find('h3');
    const h3InnerText = h3.first().text();
    expect(h3InnerText).toEqual(store.getState().gameSettings.storyTypeShort);
  });
});

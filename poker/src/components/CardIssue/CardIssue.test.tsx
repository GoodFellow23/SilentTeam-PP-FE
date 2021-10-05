import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'enzyme';

import CardIssue from './CardIssue';
import { store } from '../../redux/store';

const cardInit = { id: '0', title: 'issue title', desc: 'issue description' };

describe('CardIssue', () => {
  const wrapper = render(
    <Provider store={store}>
      <CardIssue issue={cardInit} />
    </Provider>,
  );

  const p = wrapper.find('p');

  it('should render one paragraph', () => {
    expect(p).toHaveLength(1);
  });

  it('should render text in paragraph equal cardInit.id + 1', () => {
    const pInnerText = p.first().text();
    expect(pInnerText).toEqual(`issue ${Number(cardInit.id) + 1}`);
  });

  it('should render text in title CardIssue equal cardInit.title', () => {
    const h3 = wrapper.find('h3');
    const h3InnerText = h3.first().text();
    expect(h3InnerText).toEqual(cardInit.title);
  });

  it('should render two button in CardIssue', () => {
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(2);
  });

  it('should render two images in CardIssue', () => {
    const images = wrapper.find('img');
    expect(images).toHaveLength(2);
  });
});

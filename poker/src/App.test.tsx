import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

describe('App', () => {
  let wrapper: HTMLDivElement;
  let tree: string;

  beforeEach(() => {
    wrapper = document.createElement('div');
    document.body.appendChild(wrapper);
    ReactDOM.render(<App />, wrapper);
    tree = JSON.stringify(wrapper);
  });

  afterEach(() => {
    document.body.removeChild(wrapper);
    wrapper.remove();
  });

  it('renders learn react link', () => {
    expect(tree).toMatchSnapshot();
  });
});

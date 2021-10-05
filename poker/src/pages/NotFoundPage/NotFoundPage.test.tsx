import React from 'react';
import ReactDOM from 'react-dom';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<NotFoundPage />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  test('should have one title', () => {
    const title = container.querySelectorAll('h2');
    expect(title).toHaveLength(1);
  });

  test('h2 to have text "NotFoundPage"', () => {
    const title = container.querySelector('h2');
    expect(title && title.outerHTML).toMatch(/NotFoundPage/i);
  });
});

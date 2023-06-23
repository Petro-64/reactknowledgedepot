import React from 'react';
//import ReactDOM, { render } from 'react-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Test from './components/Test';
import App from './index';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });


test('ll', async () => {
  render(<App />, document.getElementById('app'))
})
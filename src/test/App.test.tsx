import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders event log header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Event Log/i);
  expect(linkElement).toBeInTheDocument();
});

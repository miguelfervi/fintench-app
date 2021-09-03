import React from 'react';import { render, screen } from '@testing-library/react';
import StartingPageContent from '../StartingPageContent';

test('renders learn react link', () => {
  render(<StartingPageContent />);
  const linkElement = screen.getByText(/Welcome to Fintech App!/i);
  expect(linkElement).toBeInTheDocument();
});

// Mars.test.js

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Mars from '../components/Mars';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

describe('Mars Component', () => {
  test('renders Mars Rover Photos title', async () => {
    const { getByText } = render(<Mars />);
    await waitFor(() => {
      const title = getByText(/Mars Rover Photos/i);
      expect(title).toBeInTheDocument();
    });
  });

  test('renders Mars photo cards', async () => {
    const { getAllByAltText } = render(<Mars />);
    await waitFor(() => {
      const images = getAllByAltText(/Mars/i);
      expect(images.length).toBeGreaterThan(0);
    });
  });

});

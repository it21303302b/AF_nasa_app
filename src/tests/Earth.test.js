// Earth.test.js

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Earth from '../components/Earth';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

describe('Earth Component', () => {
  test('renders Earth Photos title', async () => {
    const { getByText } = render(<Earth />);
    await waitFor(() => {
      const title = getByText(/Earth Photos/i);
      expect(title).toBeInTheDocument();
    });
  });

  test('renders Earth photo cards', async () => {
    const { getAllByAltText } = render(<Earth />);
    await waitFor(() => {
      const images = getAllByAltText(/Earth/i);
      expect(images.length).toBeGreaterThan(0);
    });
  });

  // Add more tests as needed
});

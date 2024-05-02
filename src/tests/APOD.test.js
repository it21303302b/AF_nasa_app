// APOD.test.js

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import APOD from '../components/APOD';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

describe('APOD Component', () => {
  test('renders APOD title', async () => {
    const { getByText } = render(<APOD />);
    await waitFor(() => {
      const title = getByText(/Astronomy Picture of the Day/i);
      expect(title).toBeInTheDocument();
    });
  });

  test('renders Choose Date button', async () => {
    const { getByText } = render(<APOD />);
    await waitFor(() => {
      const button = getByText(/Choose Date/i);
      expect(button).toBeInTheDocument();
    });
  });

  test('renders Reset to Today button', async () => {
    const { getByText } = render(<APOD />);
    await waitFor(() => {
      const button = getByText(/Reset to Today/i);
      expect(button).toBeInTheDocument();
    });
  });

  test('renders Previous APOD images section', async () => {
    const { getByText } = render(<APOD />);
    await waitFor(() => {
      const section = getByText(/Previous APOD images/i);
      expect(section).toBeInTheDocument();
    });
  });

});

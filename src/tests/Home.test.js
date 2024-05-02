// Home.test.js

import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router
import Home from '../components/Home';

describe('Home Component', () => {
  test('renders welcome text', () => {
    const { getByText } = render(<Router><Home /></Router>); // Wrap Home component with Router
    const welcomeText = getByText(/Welcome to APOD Project/i);
    expect(welcomeText).toBeInTheDocument();
  });

  test('renders APOD, Mars, and Earth links', () => {
    const { getByText } = render(<Router><Home /></Router>); // Wrap Home component with Router
    const apodLink = getByText(/Click to view APOD/i);
    const marsLink = getByText(/Click to explore Mars/i);
    const earthLink = getByText(/Click to explore Earth/i);
    expect(apodLink).toBeInTheDocument();
    expect(marsLink).toBeInTheDocument();
    expect(earthLink).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import constants from '../helpers/constants';
import Navbar from '../components/Navbar';

/* global test, expect */
/* eslint no-undef: "error" */

test('should render navbar with brand', () => {
  render(<Navbar />);

  const navbar = screen.getByText(constants.BRAND);
  expect(navbar).toBeInTheDocument();
});

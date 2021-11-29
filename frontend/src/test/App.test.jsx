import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

/* global jest, test, expect */
/* eslint no-undef: "error" */

jest.mock('../components/Tickets', () => function Tickets() {
  return <div>Tickets</div>;
});
jest.mock('../components/Navbar', () => function Navbar() {
  return <div>Navbar</div>;
});

test('should render navbar and tickets', () => {
  render(<App />);
  const tickets = screen.getByText('Tickets');
  expect(tickets).toBeInTheDocument();
  const navbar = screen.getByText('Navbar');
  expect(navbar).toBeInTheDocument();
});

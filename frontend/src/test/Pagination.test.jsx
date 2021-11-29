import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';

/* global test, expect, jest */
/* eslint no-undef: "error" */

test('should render navbar and tickets', () => {
  render(<Pagination page={1} next={jest.fn()} previous={jest.fn()} hasMore />);

  const pagination = screen.getByText('Page 1');
  expect(pagination).toBeInTheDocument();

  const previousButton = screen.getByText('Previous');
  const nextButton = screen.getByText('Next');
  expect(previousButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
});

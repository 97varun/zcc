import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import constants from '../helpers/constants';

import Tickets from '../components/Tickets';

/* global afterEach, beforeAll, afterAll, expect, test, jest */
/* eslint no-undef: "error" */

const sampleResponse = {
  tickets: [
    {
      id: 1,
      subject: 'Ticket 1',
      description: 'Description 1',
      requester: 'test user',
      assignee: ' ',
      status: 'closed',
    },
    {
      id: 2,
      subject: 'Ticket 2',
      description: 'Description 2',
      reqester: 'test user',
      assignee: 'test user',
      status: 'open',
    },
  ],
  meta: {
    after_cursor: '',
    before_cursor: '',
    has_more: true,
  },
};

const server = setupServer(
  rest.get(`${constants.HOST}/api/tickets`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(sampleResponse),
  )),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('../components/Pagination', () => function Pagination() {
  return <div>Pagination</div>;
});

test('should render tickets', async () => {
  render(<Tickets />);

  expect(document.querySelectorAll('h2').length).toBe(1);
  expect(document.querySelectorAll('h2')[0].textContent).toBe('Tickets');
  expect(document.querySelectorAll('hr').length).toBe(1);

  await waitFor(() => expect(screen.getByText('Ticket 1')).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText('Ticket 2')).toBeInTheDocument());

  expect(screen.getByText('Pagination')).toBeInTheDocument();
});

test('should render error', async () => {
  server.use(
    rest.get(`${constants.HOST}/api/tickets`, (req, res, ctx) => res(
      ctx.status(500),
      ctx.json({
        error: {
          message: 'Error message',
        },
      }),
    )),
  );

  render(<Tickets />);

  await waitFor(
    () => expect(screen.getByText(constants.ERROR_MESSAGE_SUBJECT)).toBeInTheDocument(),
  );
  expect(screen.getByText(constants.ERROR_MESSAGE_DESCRIPTION)).toBeInTheDocument();
  expect(screen.queryByText('Pagination')).not.toBeInTheDocument();
});

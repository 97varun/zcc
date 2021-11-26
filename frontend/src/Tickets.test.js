import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import constants from './constants';

import Tickets from './Tickets';

const server = setupServer(
    rest.get(`${constants.HOST}/api/tickets`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                tickets: [
                    {
                        id: 1,
                        subject: 'Ticket 1',
                        description: 'Description 1',
                    },
                    {
                        id: 2,
                        subject: 'Ticket 2',
                        description: 'Description 2',
                    },
                ],
                "meta": {
                    "after_cursor": "",
                    "before_cursor": "",
                    "has_more": true,
                }
            })
        );
    })
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('./Pagination', () => () => <div>Pagination</div>);

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
        rest.get(`${constants.HOST}/api/tickets`, (req, res, ctx) => {
            return res(
                ctx.status(500),
                ctx.json({
                    error: {
                        message: 'Error message',
                    }
                })
            );
        })
    );

    render(<Tickets />);

    await waitFor(() => expect(screen.getByText(constants.ERROR_MESSAGE_SUBJECT)).toBeInTheDocument());
    expect(screen.getByText(constants.ERROR_MESSAGE_DESCRIPTION)).toBeInTheDocument();
    expect(screen.queryByText('Pagination')).not.toBeInTheDocument();
});
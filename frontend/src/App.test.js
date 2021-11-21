import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./Tickets', () => () => <div>Tickets</div>);
jest.mock('./Navbar', () => () => <div>Navbar</div>);

test('should render navbar and tickets', () => {
  render(<App />);
  const tickets = screen.getByText('Tickets');
  expect(tickets).toBeInTheDocument();
  const navbar = screen.getByText('Navbar');
  expect(navbar).toBeInTheDocument();
});

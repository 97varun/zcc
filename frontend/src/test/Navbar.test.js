import { render, screen } from '@testing-library/react';
import constants from '../helpers/constants';
import Navbar from '../components/Navbar';

test('should render navbar with brand', () => {
  render(<Navbar />);
  
  const navbar = screen.getByText(constants.BRAND);
  expect(navbar).toBeInTheDocument();
});
import { render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';

test('should render navbar and tickets', () => {
    render(<Pagination page="testpagination" />);

    const pagination = screen.getByText('Page testpagination');
    expect(pagination).toBeInTheDocument();

    const previousButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
});
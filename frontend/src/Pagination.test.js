import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

test('should render navbar and tickets', () => {
    render(<Pagination title="testpagination" />);

    const pagination = screen.getByText('testpagination');
    expect(pagination).toBeInTheDocument();

    const previousButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
});

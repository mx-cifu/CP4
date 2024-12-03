import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from '../pages/Blog';


jest.mock('../components/Header', () => () => <nav>fake test header</nav>);
jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(() => ({})),
}));
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(() => jest.fn()),
}));

describe('Post Component with Mocked Header', () => {
    test('renders header and login within home', () => {
        render(<Blog />);

        expect(screen.getByText('fake test header')).toBeInTheDocument();
        expect(screen.getByText('Please visit Home to login to be able to create a new post, and view your previous posts!'))
        .toBeInTheDocument();
    });
});
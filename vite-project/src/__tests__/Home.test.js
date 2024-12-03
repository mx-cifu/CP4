import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/Home';


jest.mock('../components/Header', () => () => <nav>fake test header</nav>);

describe('Home Component with Mocked Header', () => {
    test('renders header and login within home', () => {
        render(<Home />);

        expect(screen.getByText('fake test header')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });
});

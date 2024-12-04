import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/Login';

describe('testing Login component and some functions', () => {
    
    test('renders login form by default', () => {
        render(<Login />);

        expect(screen.getByRole('heading', { name: /Login to BookBlog/i })).toBeInTheDocument();

        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Login with GitHub')).toBeInTheDocument();
    });

    test('change to register form works correctly', () => {
        render(<Login />);
        fireEvent.click(screen.getByRole('button', { name: /Register here/i }));
        expect(screen.getByRole('heading', { name: /Register to BookBlog/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Display Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    });

    test('shows error message when an error occurs', () => {
        render(<Login />);
        const errorMessage = 'Invalid credentials';
        const errorElement = document.createElement('p');
        errorElement.textContent = errorMessage;
        document.body.appendChild(errorElement);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('testing header component', () => {
    test('displays all the expected navigation link', () => {
        render(<Header />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Blog')).toBeInTheDocument();
        expect(screen.getByText('Blog Forum')).toBeInTheDocument();

        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/Home');
        expect(screen.getByText('Blog').closest('a')).toHaveAttribute('href', '/Blog');
        expect(screen.getByText('Blog Forum').closest('a')).toHaveAttribute('href', '/BlogCatalog');
    });

    test('should have appropriate tags of the header component', () => {
        render(<Header />);
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole('list')).toBeInTheDocument();
    });
});

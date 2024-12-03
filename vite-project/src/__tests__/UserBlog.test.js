import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import UserBlog from '../components/UserBlog';

jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(() => ({})),
    ref: jest.fn(),
    get: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}));

describe('testing UserBlog component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('mocking retrieving uid from params', async () => {
        const mockUserId = 'testUid';
        useParams.mockReturnValue({ userId: mockUserId });
    });

    test('display name not available does not break function', async () => {
        const mockUserId = 'unknownUser';
        useParams.mockReturnValue({ userId: mockUserId });
        
        get.mockImplementation((refPath) => {
            if (refPath === `users/${mockUserId}/displayName`) {
                return Promise.resolve({
                    exists: () => false,
                });
            }
            return Promise.resolve({ exists: () => false });
        });

        render(<UserBlog />);
        await waitFor(() => {
            expect(screen.getByText('Blog Posts')).toBeInTheDocument()
        });
    });
});

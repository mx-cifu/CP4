import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Posts from '../components/Posts'; 

jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(() => ({})),
    ref: jest.fn(),
    push: jest.fn(() => 'newPostRef'),
    set: jest.fn(() => Promise.resolve()),
    get: jest.fn((ref) => {
        if (ref === 'testRef') {
            return Promise.resolve({
                exists: () => true,
                val: () => ({
                    post1: { title: 'First Post', text: 'Content', timestamp: '2024-12-02', author: 'Author 1' },
                    post2: { title: 'Second Post', text: 'More Content', timestamp: '2024-12-01', author: 'Author 2' },
                }),
            });
        }
        return Promise.resolve({ exists: () => false });
    }),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(() => jest.fn()),
}));

describe('Posts Component', () => {
    beforeEach(() => {
        localStorage.setItem('uid', 'testUser');
    });

    afterEach(() => {
        localStorage.clear();
    });


    test('handles adding a new post', async () => {
        render(<Posts />);

        fireEvent.click(screen.getByText(/Write a New Blog Post ▼/i));

        fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Post' } });
        fireEvent.change(screen.getByPlaceholderText('Author'), { target: { value: 'New Author' } });
        fireEvent.change(screen.getByPlaceholderText('Write your post here...'), { target: { value: 'New text' } });
        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(screen.getByText('New text')).toBeInTheDocument();
            expect(screen.getByText((content) => content.includes('New Author'))).toBeInTheDocument();
        });
    });
});

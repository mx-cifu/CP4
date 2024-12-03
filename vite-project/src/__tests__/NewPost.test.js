import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewPost from '../components/NewPost';

describe('NewPost Component', () => {
    const mockOnAddPost = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('checks NewPost form is rendered correctly', () => {
        render(<NewPost onAddPost={mockOnAddPost} />);

        expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Author')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Write your post here...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });

    test('checks if user inpt is handled as expected', () => {
        render(<NewPost onAddPost={mockOnAddPost} />);
  
        fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'My Test Blog Title' } });
        fireEvent.change(screen.getByPlaceholderText('Author'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Write your post here...'), { target: { value: 'This is my test blog content.' } });

        expect(screen.getByPlaceholderText('Title')).toHaveValue('My Test Blog Title');
        expect(screen.getByPlaceholderText('Author')).toHaveValue('John Doe');
        expect(screen.getByPlaceholderText('Write your post here...')).toHaveValue('This is my test blog content.');
    });

    test('calls onAddPost with correct data on form submission', () => {
        render(<NewPost onAddPost={mockOnAddPost} />);
 
        fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'My Test Blog Title' } });
        fireEvent.change(screen.getByPlaceholderText('Author'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Write your post here...'), { target: { value: 'This is my test blog content.' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        expect(mockOnAddPost).toHaveBeenCalledTimes(1);
        expect(mockOnAddPost).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'My Test Blog Title',
                author: 'John Doe',
                text: 'This is my test blog content.',
                timestamp: expect.any(String),
            })
        );
    });

    test('resets input fields after submission', () => {
        render(<NewPost onAddPost={mockOnAddPost} />);

        fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'My Test Blog Title' } });
        fireEvent.change(screen.getByPlaceholderText('Author'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Write your post here...'), { target: { value: 'This is my test blog content.' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        expect(screen.getByPlaceholderText('Title')).toHaveValue('');
        expect(screen.getByPlaceholderText('Author')).toHaveValue('');
        expect(screen.getByPlaceholderText('Write your post here...')).toHaveValue('');
    });
});

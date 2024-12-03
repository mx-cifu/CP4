import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadBlogPosts from '../components/LoadPosts';

describe('testing the LoadPosts component', () => {
    const mockPosts = [
        {
            title: 'First Fakest Post',
            text: 'Most poser of posts',
            author: 'Jane Doe',
            timestamp: '2024-12-02T22:21:04.785Z',
        },
        {
            title: 'Second Fakest Post',
            text: 'Seond posiest of posers.',
            author: 'Batman',
            timestamp: '2024-12-01T20:15:00.000',
        },
    ];

    test('blog posts are loaded in correctly', () => {
        render(<LoadBlogPosts posts={mockPosts} displayName="John's" />);
        expect(screen.getByText("John's Blog Posts")).toBeInTheDocument();

        
        expect(screen.getByText('First Fakest Post')).toBeInTheDocument();
        expect(screen.getByText('Second Fakest Post')).toBeInTheDocument();
    
        expect(screen.getByText('By: Jane Doe')).toBeInTheDocument();
        expect(screen.getByText('By: Batman')).toBeInTheDocument();

        expect(screen.getByText('Posted on: 2024-12-02 at 22:21:04')).toBeInTheDocument();
        expect(screen.getByText('Posted on: UNKNOWN at N/A')).toBeInTheDocument();
    });

    test('proper message displayed when there are no posts', () => {
        render(<LoadBlogPosts posts={[]} displayName="John's" />);
        expect(screen.getByText('You have no blog posts! Get started on your first post now!')).toBeInTheDocument();
    });
});

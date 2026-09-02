import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders form elements correctly', () => {
    render(<App />);
    
    // Check if form heading is rendered
    expect(screen.getByText(/User Submission Form/i)).toBeInTheDocument();
    
    // Check if input fields are rendered by their name attribute or labels
    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByText(/Message:/i)).toBeInTheDocument();
    
    // Check if submit button is rendered
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });
});
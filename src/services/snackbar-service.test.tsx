import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider, useSnackbar } from './snackbar-service';

// Test component that uses the useSnackbar hook
const TestComponent: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  return (
    <button onClick={() => showSnackbar('Test message', 'success')}>
      Show Snackbar
    </button>
  );
};

describe('SnackbarService', () => {
  it('renders children correctly', () => {
    render(
      <SnackbarProvider>
        <div>Test Child</div>
      </SnackbarProvider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('shows snackbar when showSnackbar is called', async () => {
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    const button = screen.getByText('Show Snackbar');
    await userEvent.click(button);

    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardSuccess');
  });

  it('throws an error when useSnackbar is used outside SnackbarProvider', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'useSnackbar must be used within a SnackbarProvider'
    );

    consoleErrorSpy.mockRestore();
  });
});

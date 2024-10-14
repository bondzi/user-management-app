import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationDialog from './ConfirmationDialog';

describe('ConfirmationDialog', () => {
  const mockProps = {
    open: true,
    title: 'Confirm Action',
    content: 'Are you sure you want to proceed?',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  it('renders correctly when open', () => {
    render(<ConfirmationDialog {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.content)).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<ConfirmationDialog {...mockProps} open={false} />);

    expect(screen.queryByText(mockProps.title)).not.toBeInTheDocument();
    expect(screen.queryByText(mockProps.content)).not.toBeInTheDocument();
  });

  it('calls onConfirm when Confirm button is clicked', () => {
    render(<ConfirmationDialog {...mockProps} />);

    fireEvent.click(screen.getByText('Confirm'));
    expect(mockProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Cancel button is clicked', () => {
    render(<ConfirmationDialog {...mockProps} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockProps.onCancel).toHaveBeenCalledTimes(1);
  });
});


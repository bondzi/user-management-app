import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

export interface ConfirmationDialogProps {
  open: boolean;        // Controls whether the dialog is visible
  title: string;        // The title of the dialog
  content: string;      // The main content/message of the dialog
  onConfirm: () => void; // Function to call when the user confirms
  onCancel: () => void;  // Function to call when the user cancels
}

/**
 * ConfirmationDialog Component
 * 
 * A reusable dialog component for confirming user actions.
 * It uses Material-UI components to create a modal dialog with a title,
 * content, and two action buttons (Cancel and Confirm).
 *
 * @param {ConfirmationDialogProps} props - The props for the component
 * @returns {React.ReactElement} The rendered ConfirmationDialog component
 */
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  content,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

import { StoryFn, Meta } from '@storybook/react';
import ConfirmationDialog, { ConfirmationDialogProps } from './ConfirmationDialog';

export default {
  title: 'Components/ConfirmationDialog',
  component: ConfirmationDialog,
  argTypes: {
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'cancelled' },
  },
} as Meta;

const Template: StoryFn<ConfirmationDialogProps> = (args) => <ConfirmationDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
  title: 'Confirm Action',
  content: 'Are you sure you want to perform this action?',
};

export const CustomButtons = Template.bind({});
CustomButtons.args = {
  ...Default.args,
};

export const LongContent = Template.bind({});
LongContent.args = {
  ...Default.args,
  content: 'This is a longer confirmation message. It might span multiple lines and provide more detailed information about the action that is about to be performed.',
};
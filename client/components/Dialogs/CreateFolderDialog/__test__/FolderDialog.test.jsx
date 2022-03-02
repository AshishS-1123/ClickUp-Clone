import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FolderDialog from '../FolderDialog';

let component = null;

describe('<FolderDialog /> tests', () => {
  // Snapshot Testing
  it('should match snapshot', () => {
    component = render(
      <FolderDialog
        open
        closeDialog={() => { }}
        handleCreateFolder={() => { }}
        ref={null}
      />,
    );

    expect(component.container).toMatchSnapshot();
  });

  // Test for syntax errors.
  it('should render without crashing', () => {
    component = render(
      <FolderDialog
        open
        closeDialog={() => { }}
        handleCreateFolder={() => { }}
        ref={null}
      />,
    );
  });

  //Test that visibility of component can be controlled by open prop.
  it("should be displayed when 'open' prop is passed", () => {
    component = render(
      <FolderDialog
        open
        closeDialog={() => { }}
        handleCreateFolder={() => { }}
        ref={null}
      />,
    );

    expect(screen.getByRole('dialog')).toBeDefined();
  });

  //Test that visibility of component can be controlled by open prop.
  it("should not be displayed when 'open' prop is passed", () => {
    component = render(
      <FolderDialog
        open={false}
        closeDialog={() => { }}
        handleCreateFolder={() => { }}
        ref={null}
      />,
    );

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  // Standard behaviour for backdrop. Implementation from mui.
  it('should close when backdrop is clicked', () => {
    const closeDialog = jest.fn();
    const handleCreateFolder = jest.fn();

    component = render(
      <FolderDialog
        open
        closeDialog={closeDialog}
        handleCreateFolder={handleCreateFolder}
        ref={null}
      />,
    );

    // Get the backdrop.
    const backdrop = screen.getByRole('dialog').parentElement;

    // Click on the backdrop.
    userEvent.click(backdrop);

    // Assert that the closeDialog fundtion was called.
    expect(closeDialog).toHaveBeenCalledTimes(1);
  });

  // Test that function for closing dialog is called when close icon is clicked.
  it('should should close when close icon is clicked', () => {
    const closeDialog = jest.fn();
    const handleCreateFolder = jest.fn();

    component = render(
      <FolderDialog
        open
        closeDialog={closeDialog}
        handleCreateFolder={handleCreateFolder}
        ref={null}
      />,
    );

    // Get the close icon button.
    const button = screen.getByTestId('CloseIcon');

    // Click on the button.
    userEvent.click(button);

    // Assert that the closeDialog fundtion was called.
    expect(closeDialog).toHaveBeenCalledTimes(1);
  });

  // Check UI layout.
  it('should have a title, close icon, input element and submit button', () => {
    component = render(
      <FolderDialog
        open
        closeDialog={jest.fn()}
        handleCreateFolder={jest.fn()}
        ref={null}
      />,
    );

    // Check label is present.
    expect(screen.getByLabelText('Folder name')).toBeDefined();
    // Check input is present.
    expect(screen.getByPlaceholderText('Enter folder name')).toBeDefined();
    // Check submit button is present
    expect(screen.getByText('Create folder')).toBeDefined();
  });
});

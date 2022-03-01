import React from 'react';
import { getByPlaceholderText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FolderDialog from '../FolderDialog';

let component = null;

describe('<FolderDialog /> tests', () => {
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

/*

To find backdrop => getByRole('dialog).parentElement
*/

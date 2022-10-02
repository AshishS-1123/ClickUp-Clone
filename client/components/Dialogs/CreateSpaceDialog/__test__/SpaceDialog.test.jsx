import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SpaceDialog from "../SpaceDialog";

let component = null;

describe("<SpaceDialog /> tests", () => {
  // Snapshot Testing
  it("should match snapshot", () => {
    component = render(
      <SpaceDialog
        open
        closeDialog={() => { }}
        handleCreateSpace={() => { }}
        ref={null}
      />,
    );

    expect(component.container).toMatchSnapshot();
  });

  // Test for syntax errors.
  it("should render without crashing", () => {
    component = render(
      <SpaceDialog
        open
        closeDialog={() => { }}
        handleCreateSpace={() => { }}
        ref={null}
      />,
    );
  });

  //Test that visibility of component can be controlled by open prop.
  it("should be displayed when 'open' prop is passed", () => {
    component = render(
      <SpaceDialog
        open
        closeDialog={() => { }}
        handleCreateSpace={() => { }}
        ref={null}
      />,
    );

    expect(screen.getByRole("dialog")).toBeDefined();
  });

  //Test that visibility of component can be controlled by open prop.
  it("should not be displayed when 'open' prop is passed", () => {
    component = render(
      <SpaceDialog
        open={false}
        closeDialog={() => { }}
        handleCreateSpace={() => { }}
        ref={null}
      />,
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  // Standard behaviour for backdrop. Implementation from mui.
  it("should close when backdrop is clicked", () => {
    const closeDialog = jest.fn();
    const handleCreateSpace = jest.fn();

    component = render(
      <SpaceDialog
        open
        closeDialog={closeDialog}
        handleCreateSpace={handleCreateSpace}
        ref={null}
      />,
    );

    // Get the backdrop.
    const backdrop = screen.getByRole("dialog").parentElement;

    // Click on the backdrop.
    userEvent.click(backdrop);

    // Assert that the closeDialog fundtion was called.
    expect(closeDialog).toHaveBeenCalledTimes(1);
  });

  // Test that function for closing dialog is called when close icon is clicked.
  it("should should close when close icon is clicked", () => {
    const closeDialog = jest.fn();
    const handleCreateSpace = jest.fn();

    component = render(
      <SpaceDialog
        open
        closeDialog={closeDialog}
        handleCreateSpace={handleCreateSpace}
        ref={null}
      />,
    );

    // Get the close icon button.
    const button = screen.getByTestId("CloseIcon");

    // Click on the button.
    userEvent.click(button);

    // Assert that the closeDialog fundtion was called.
    expect(closeDialog).toHaveBeenCalledTimes(1);
  });

  // Check UI layout.
  it("should have a title, close icon, input element and submit button", () => {
    component = render(
      <SpaceDialog
        open
        closeDialog={jest.fn()}
        handleCreateSpace={jest.fn()}
        ref={null}
      />,
    );

    // Check label is present.
    expect(screen.getByLabelText("Space name")).toBeDefined();
    // Check input is present.
    expect(screen.getByPlaceholderText("Enter space name")).toBeDefined();
    // Check submit button is present
    expect(screen.getByText("Create space")).toBeDefined();
  });
});

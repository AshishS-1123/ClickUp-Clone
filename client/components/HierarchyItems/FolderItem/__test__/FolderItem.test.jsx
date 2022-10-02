import React from "react";
import { render, screen, cleanup, waitFor, fireEvent, within } from "../../../../utils/testUtils";
import userEvent from "@testing-library/user-event";
import FolderItem from "../../FolderItem";

afterEach(cleanup);

describe("<FolderItem /> tests", () => {
  it("should match snapshot", () => {
    const component = render(
      <FolderItem id="1" folderName="Folder 1" contents={[]} nestingLevel={10} />
    );

    expect(component.container).toMatchSnapshot();
  });

  it("should render without crashing", () => {
    const component = render(
      <FolderItem id="1" folderName="Folder 1" contents={[]} nestingLevel={10} />
    );
  });

  it("should update redux store when marked as active", () => {
  });

  it("should show options button and arrow when hovered", async () => {
    const component = render(
      <FolderItem id="1" folderName="Folder 1" contents={[]} nestingLevel={10} />
    );

    // Icons should not be shown before hover.
    expect(screen.queryByTestId("MoreHorizIcon")).not.toBeVisible();
    expect(screen.queryByTestId("KeyboardArrowDownIcon")).not.toBeVisible();

    fireEvent.mouseOver(component.container);

    await waitFor(() => {
      expect(screen.getByTestId("MoreHorizIcon")).toHaveStyle("display: inline-block");
      expect(screen.getByTestId("KeyboardArrowDownIcon")).toHaveStyle("visibility: visible");
    })
  });

})

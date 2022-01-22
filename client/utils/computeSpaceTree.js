
function computeSpaceTree(data) {
  const returnValue = [];

  function getChildrenForSpace(children) {
    return children.map(child => {
      if (child.childType == "FOLDER") {
        return getFolderData(child.id);
      } else {
        return getListData(child.id);
      }
    });
  }

  function getFolderData(folderId) {
    const folder = data.folderData.filter(item => item._id == folderId)[0];
    // console.log("Folder", folder);

    const contents = folder.children.map(child => {
      if (child.childType == "FOLDER") {
        return getFolderData(child.id);
      } else {
        return getListData(child.id);
      }
    });

    return {
      itemType: "FOLDER",
      id: folderId,
      name: folder.name,
      contents: contents,
    }
  }

  function getListData(listId) {
    const list = data.listData.filter(item => item._id == listId)[0];

    // console.log("For List:: ", list.name);
    return {
      itemType: "LIST",
      id: listId,
      name: list.name,
    }
  }

  return function computeHierarchies() {
    data.spaceData.forEach(space => {
      // console.log("For Space:: ", space.name);
      // Get all the children for this space.
      const contents = getChildrenForSpace(space.children);

      returnValue.push({
        id: space._id,
        name: space.name,
        contents: contents,
      });
    });

    return returnValue;
  }

}

export default computeSpaceTree;

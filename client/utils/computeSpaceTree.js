function computeSpaceTree(data) {
  const returnValue = [];

  function getListData(listId) {
    // eslint-disable-next-line no-underscore-dangle
    const list = data.listData.filter((item) => item._id === listId)[0];

    return {
      itemType: 'LIST',
      id: listId,
      name: list.name,
    };
  }

  function getFolderData(folderId) {
    // eslint-disable-next-line no-underscore-dangle
    const folder = data.folderData.filter((item) => item._id === folderId)[0];

    const contents = folder.children.map((child) => {
      if (child.childType === 'FOLDER') {
        return getFolderData(child.id);
      } if (child.childType === 'LIST') {
        return getListData(child.id);
      } if (child.childType === 'TASK') {
        return { itemType: 'TASK', id: child.id };
      }

      return undefined;
    });

    return {
      itemType: 'FOLDER',
      id: folderId,
      name: folder.name,
      contents,
    };
  }

  function getChildrenForSpace(children) {
    return children.map((child) => {
      if (child.childType === 'FOLDER') {
        return getFolderData(child.id);
      }
      return getListData(child.id);
    });
  }

  return function computeHierarchies() {
    data.spaceData.forEach((space) => {
      // Get all the children for this space.
      const contents = getChildrenForSpace(space.children);

      returnValue.push({
        // eslint-disable-next-line no-underscore-dangle
        id: space._id,
        name: space.name,
        contents,
      });
    });

    return returnValue;
  };
}

export default computeSpaceTree;

import { fetchSpace } from "./spaceRequests"
import { fetchFolder } from "./folderRequests";
import { fetchList } from "./listRequests";
import { fetchTask } from "./taskRequests";

export const fetchSpaceEverything = async (spaceId, workspaceId, userId, token) => {
  // This is the value we will be returning.
  const returnValue = {
    space: [], // Data for the space. spaceId, spaceName, children(type, id)
    folder: [], // data for all folders. folderId, folderName, children(type, id)
    list: [], // data for all lists. listId, listName, tasks
    task: [], // data for tasks.
  }

  // This queue contains all the data that needs to be fetched.
  // Each element is an object containing type of data to fetch (space, folder, list)
  // and id of data.
  const fetchQueue = [{ itemType: "SPACE", itemId: spaceId, parentType: "WORKSPACE", parentId: workspaceId }];

  while (fetchQueue.length != 0) {
    // Remove the firstmost element from the queue.
    const itemToFetch = fetchQueue.shift();

    let fetchedItem;

    // Fetch this item.
    switch (itemToFetch.itemType) {
      case "SPACE":
        fetchedItem = await fetchSpace(itemToFetch.itemId, itemToFetch.parentId, userId, token);
        fetchedItem = fetchedItem.data;
        break;
      case "FOLDER":
        fetchedItem = await fetchFolder(itemToFetch.itemId, itemToFetch.parentType, itemToFetch.parentId, userId, token);
        fetchedItem = fetchedItem.data;
        break;
      case "LIST":
        fetchedItem = await fetchList(itemToFetch.itemId, itemToFetch.parentType, itemToFetch.parentId, userId, token);
        fetchedItem = fetchedItem.data;
        break;
      case "TASK":
        fetchedItem = await fetchTask(itemToFetch.itemId, itemToFetch.parentType, itemToFetch.parentId, userId, token);
        fetchedItem = fetchedItem.data;
        break;
    }

    // If fetching failed,
    if (!fetchedItem.success) {
      throw new Error(fetchedItem.error);
    }

    // If the data was successfully fetched, place it in the return value.
    switch (itemToFetch.itemType) {
      case "SPACE":
        returnValue.space.push(fetchedItem.space);
        fetchedItem = fetchedItem.space;
        break;
      case "FOLDER":
        returnValue.folder.push(fetchedItem.folder);
        fetchedItem = fetchedItem.folder;
        break;
      case "LIST":
        returnValue.list.push(fetchedItem.list);
        fetchedItem = fetchedItem.list;
        break;
      case "TASK":
        returnValue.task.push(fetchedItem.task);
        fetchedItem = fetchedItem.task;
        break;
    }

    // Now add all the children of the fetched item to the queue.
    if (fetchedItem.hasOwnProperty("children")) {
      fetchedItem.children.forEach(child => {
        fetchQueue.push({
          itemType: child.childType,
          itemId: child.id,
          parentType: itemToFetch.itemType,
          parentId: itemToFetch.itemId,
        });
      });
    }
  }

  return returnValue;
}

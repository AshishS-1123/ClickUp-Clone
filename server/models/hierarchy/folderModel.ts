import { CRUD_CreateFunc, CRUD_DeleteFunc, CRUD_ReadFunc, CRUD_UpdateFunc } from "./types";

type FolderDataType = {
  id: string,
  parentId: string,
  name: string,
}

const createFolderForSpace: CRUD_CreateFunc<FolderDataType> = (data: FolderDataType, parentId: string): boolean => {
  return false;
}

const getFolderFromId: CRUD_ReadFunc<FolderDataType> = (itemId: string): FolderDataType => {
  const item: FolderDataType = {
    id: "",
    parentId: "",
    name: "",
  };

  return item;
}

const updateFolderData: CRUD_UpdateFunc<FolderDataType> = (itemId: string, newData: FolderDataType): boolean => {
  return false;
}

const deleteFolderFromId: CRUD_DeleteFunc<FolderDataType> = (itemId: string): boolean => {
  return false;
}

export {
  createFolderForSpace,
  getFolderFromId,
  updateFolderData,
  deleteFolderFromId,
};

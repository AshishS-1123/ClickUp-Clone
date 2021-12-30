import { CRUD_CreateFunc, CRUD_DeleteFunc, CRUD_ReadFunc, CRUD_UpdateFunc } from "./types";

type SpaceDataType = {
  id: string,
  workspaceId: string,
  name: string,
}

const createSpaceForWorkspace: CRUD_CreateFunc<SpaceDataType> = (data: SpaceDataType, parentId: string): boolean => {
  return false;
}

const getSpaceFromId: CRUD_ReadFunc<SpaceDataType> = (itemId: string): SpaceDataType => {
  const item: SpaceDataType = {
    id: "",
    workspaceId: "",
    name: "",
  };

  return item;
}

const updateSpaceData: CRUD_UpdateFunc<SpaceDataType> = (itemId: string, newData: SpaceDataType): boolean => {
  return false;
}

const deleteSpaceFromId: CRUD_DeleteFunc<SpaceDataType> = (itemId: string): boolean => {
  return false;
}

export {
  createSpaceForWorkspace,
  getSpaceFromId,
  updateSpaceData,
  deleteSpaceFromId,
};

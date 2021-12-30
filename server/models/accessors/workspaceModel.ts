import { CRUD_CreateFunc, CRUD_DeleteFunc, CRUD_ReadFunc, CRUD_UpdateFunc } from "./types";

type WorkspaceDataType = {
  id: string,
  userId: string,
  name: string,
}

const createWorkspaceForUser: CRUD_CreateFunc<WorkspaceDataType> = (data: WorkspaceDataType, parentId: string): boolean => {
  return false;
}

const getWorkspaceFromId: CRUD_ReadFunc<WorkspaceDataType> = (itemId: string): WorkspaceDataType => {
  const item: WorkspaceDataType = {
    id: "",
    userId: "",
    name: "",
  };

  return item;
}

const updateWorkspaceData: CRUD_UpdateFunc<WorkspaceDataType> = (itemId: string, newData: WorkspaceDataType): boolean => {
  return false;
}

const deleteWorkspaceFromId: CRUD_DeleteFunc<WorkspaceDataType> = (itemId: string): boolean => {
  return false;
}

export {
  createWorkspaceForUser,
  getWorkspaceFromId,
  updateWorkspaceData,
  deleteWorkspaceFromId,
};

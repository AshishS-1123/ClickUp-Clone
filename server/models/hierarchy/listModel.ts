import { CRUD_CreateFunc, CRUD_DeleteFunc, CRUD_ReadFunc, CRUD_UpdateFunc } from "./types";

type ListDataType = {
  id: string,
  parentId: string,
  name: string,
}

const createListForParent: CRUD_CreateFunc<ListDataType> = (data: ListDataType, parentId: string): boolean => {
  return false;
}

const getListFromId: CRUD_ReadFunc<ListDataType> = (itemId: string): ListDataType => {
  const item: ListDataType = {
    id: "",
    parentId: "",
    name: "",
  };

  return item;
}

const updateListData: CRUD_UpdateFunc<ListDataType> = (itemId: string, newData: ListDataType): boolean => {
  return false;
}

const deleteListFromId: CRUD_DeleteFunc<ListDataType> = (itemId: string): boolean => {
  return false;
}

export {
  createListForParent,
  getListFromId,
  updateListData,
  deleteListFromId,
};

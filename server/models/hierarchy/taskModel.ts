import { CRUD_CreateFunc, CRUD_DeleteFunc, CRUD_ReadFunc, CRUD_UpdateFunc } from "./types";

type TaskDataType = {
  id: string,
  listId: string,
  name: string,
}

const createTaskForList: CRUD_CreateFunc<TaskDataType> = (data: TaskDataType, parentId: string): boolean => {
  return false;
}

const getTaskFromId: CRUD_ReadFunc<TaskDataType> = (itemId: string): TaskDataType => {
  const item: TaskDataType = {
    id: "",
    listId: "",
    name: "",
  };

  return item;
}

const updateTaskData: CRUD_UpdateFunc<TaskDataType> = (itemId: string, newData: TaskDataType): boolean => {
  return false;
}

const deleteTaskFromId: CRUD_DeleteFunc<TaskDataType> = (itemId: string): boolean => {
  return false;
}

export {
  createTaskForList,
  getTaskFromId,
  updateTaskData,
  deleteTaskFromId,
};

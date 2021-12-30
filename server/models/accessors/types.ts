/*
 * CRUD Operations : Create, Read, Update, Delete
 */

// Create Operations
interface CRUD_CreateFunc<Type> {
  (data: Type, parentId: string): boolean;
}

// Read Operations
interface CRUD_ReadFunc<Type> {
  (itemId: string): Type;
}

// Update Operations
interface CRUD_UpdateFunc<Type> {
  (itemId: string, newData: Type): boolean;
}

// Delete Operations
interface CRUD_DeleteFunc<Type> {
  (itemId: string): boolean;
}

export {
  // CRUD Operations
  CRUD_CreateFunc,
  CRUD_ReadFunc,
  CRUD_UpdateFunc,
  CRUD_DeleteFunc,
};

export type UserDataType = {
  userId: string,
  userEmail: string,
  userPassword?: string,
};

function createUserWithPassword(userData: UserDataType): boolean {
  return false;
}

function getUserFromEmail(userEmail: string): UserDataType {
  const userData: UserDataType = {
    userId: "",
    userEmail: "",
    userPassword: "",
  };

  return userData;
}

function updatePasswordForUser(userData: UserDataType, newPassword: string): boolean {
  return false;
}

export {
  createUserWithPassword,
  getUserFromEmail,
  updatePasswordForUser,
};

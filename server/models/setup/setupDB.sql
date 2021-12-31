USE clickup_db;

/*
 * Table for each User.
 */
CREATE TABLE User (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    userEmail VARCHAR(50) NOT NULL,
    userPassword VARCHAR(200) NOT NULL
);

/*
 * Table for each Workspace.
 */
CREATE TABLE Workspace (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

/*
 * Table for each Space.
 */
CREATE TABLE Space (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

/*
 * Table for each Folder.
 */
CREATE TABLE Folder (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

/*
 * Table for each List.
 */
CREATE TABLE List (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

/*
 * Table for each Task.
 */
CREATE TABLE Task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

/*
 * Table to store user-workspace relation.
 */
CREATE TABLE UserWorkspace (
    userId INT,
    workspaceId INT,
    FOREIGN KEY (userId) REFERENCES User(userId)
);

/*
 * Table to store workspace-space relation.
 */
CREATE TABLE WorkspaceSpace (
    workspaceId INT,
    spaceId INT,
    FOREIGN KEY (workspaceId) REFERENCES Workspace(id)
);

/*
 * Table to store space-content relation.
 */
CREATE TABLE SpaceContent (
    spaceId INT,
    contentId INT,
    contentType TINYINT,
    FOREIGN KEY (spaceId) REFERENCES Space(id)
);

/*
 * Table to store folder-list relation.
 */
CREATE TABLE FolderList (
    folderId INT,
    listId INT,
    FOREIGN KEY (folderId) REFERENCES Folder(id)
);

/*
 * Table to store list-task relation.
 */
CREATE TABLE ListTask (
    listId INT,
    taskId INT,
    FOREIGN KEY (listId) REFERENCES List(id)
);

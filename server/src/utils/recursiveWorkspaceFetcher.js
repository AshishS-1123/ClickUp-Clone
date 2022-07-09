// Returns the data of all children of the given workspace.
// The format of return value is 
// {spaces: [...arrray of all spaces], lists: [...array of all lists]}

const { validateSpace, validateFolder, validateList, validateTask } = require("../middleware/paramValidator");

// on the front end, we can then reconstruct this to form the tree.
exports.fetchWorkspaceRecur = async (spaceIds, userId) => {
    const spaces = [];
    const lists = [];
    const folders = [];
    const tasks = [];

    let queue = spaceIds.map(spaceId => {
        return {childType: "SPACE", id: spaceId};
    });

    // repeat until all items in the queue have been processed.
    while (queue.length !== 0) {
        // get the topmost item.
        const currentItem = queue.shift();

        // process the current item.
        switch (currentItem.childType) {
            case "SPACE":
                // get space data.
                const space = await validateSpace(currentItem.id, userId);

                // add this space to the global space store.
                spaces.push({
                    id: space._id,
                    name: space.name,
                    children: space.children
                });

                // add children to the queue.
                queue = [...queue, ...space.children];
                break;
            case "FOLDER":
                // get folder data.
                const folder = await validateFolder(currentItem.id, userId);

                // add this folder to the global folder store.
                folders.push ({
                    id: folder._id,
                    name: folder.name,
                    children: folder.children
                });

                // add children to queue.
                queue = [...queue, ...folder.children];
                break;
            case "LIST":
                // get list data.
                const list = await validateList(currentItem.id, userId);

                // add this list to the global list store.
                lists.push ({
                    id: list._id,
                    name: list.name,
                    children: list.children
                });

                // add children to queue.
                queue = [...queue, ...list.children];
                break;
            case "TASK":
                // get task data.
                const task = await validateTask(currentItem.id, userId);

                // add this task to the global task store.
                tasks.push (task);
                break;
        }
    }

    // return the computed value.
    return {spaces, folders, lists, tasks};
}
# ClickUp Clone

This is a clone of the project management service ClickUp, developed using NextJS, Express and MongoDB.

### Features Completed

1. User Authentication
2. Creating Workspaces and switching between them.
3. Creating Spaces, Folders and Lists to organize your tasks.
4. Creating Tasks and adding Priorities and Statuses to them.

### How to use

You need NodeJs and MongoDB installed to run this project.

- Clone this repo and ```cd`` into the directory.
- Install client and server side dependencies
```bash
cd client
yarn install
cd ../server
yarn install
```
- Create the **.env** files using the **.env.example** files provided in client and server folders.
- Run ```yarn dev``` in **client** and **server** directory to start the servers.

I have also created some dummy data and exported to CSV that you can use to populate your database (Check the **dummy-db-data** folder).
Check (this)[https://stackoverflow.com/questions/35119959/how-to-share-database-created-by-mongodb] link on how to use it.

### Basic Usage

1. Creating Workspaces

After registering, you will have a default workspace called *Default Workspace*.
You can also creating a new one by clicking on the Settings button in the Navigation Menu and then clicking on the '+' button.

Above the '+' button you will see the avatars of all existing workspaces you own. Click on any of them to switch.

2. Creating spaces

The button for creating spaces is hard to miss.

3. Creating Folders, Lists, Tasks

If you hover over any of the space button in the navigation menu, you will see three dots and an arrow.
Clicking on the dots will show a dialog to insert folders or lists. Clicking on the arrow will show the children of the current item.
Same goes for lists and folders.

4. Creating other stuff

You can also create priorities and statuses for the settings menu. These will define the priorities and statuses that you can assign to a task. In the future, I will also be using them to sort and group tasks in different views.

### Instructions for Deploying

1. Deploy server.

Run following command from root directory.

```
git subtree push --prefix server heroku master
```

React Native Task Manager App
=============================
> This repository contains a React Native application for managing tasks with subtasks.

### Features
**Two Pages:**
* **Task List:**
   - User can add new tasks with title, description, and due date.
   - Subtasks can be added to each task. (the due date must be on the primary task, not on the subtask)
   - Tasks and subtasks can be edited and deleted.
   - List updates dynamically after adding, editing, or deleting tasks.
* **Task Summary:**
   - Displays a summary of created tasks
      - Total number of tasks
      - Total number of subtasks
      - Title and due date of each primary task (ordered by closest due date)
   - Clicking on a task navigates to the Task List page and scrolls to the selected task.
* **Navigation:**
   - User can navigate between the two pages at any time.
   - Uses react-navigation for smooth transitions between pages.
* **Global State Management:**
   - Utilizes the useContext hook to manage task data across both pages effectively.
   - Data is not passed through navigation props.
### Getting Started:

Clone the repository:

```
  git clone https://github.com/punyawatdev/task-manager-react-native.git
```
Install dependencies:

```
  npm install
```
Run the app:

```
  npm start
  npx react-native run-android  # For Android
  npx react-native run-ios  # For iOS
```

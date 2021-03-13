# TodoApp

### Development
#### Upcoming features
- Recurring Todos, can be reset in one click.
- Multiple 'Habit' Todos
- Quick button to get rid of all the compeleted Todos.
- Public TodoLists, along with public Todos.
    - Clone privately

#### Design flaws/ bugs
- Todo compeleted toggle is not responsive enough

#### Todo
- Before unmounting the component check for uncomplete any pending asynchronus tasks.
- Logout button
- Option to clear all completed Todos
- input validation

- `/`
    - [ ] Save soritng preferences in DB
    - [ ] Whenever `global.todoLists` updates
        - [ ] Add pending and highPriority count
        - [ ] Sort
- `/list`
    - [x] Save soritng preferences in DB
    - [x] Sorting functionality, by priority and date-created
    - [ ] Expand all functionality
    - [x] Delete item functionality
    - [x] Edit item functionality
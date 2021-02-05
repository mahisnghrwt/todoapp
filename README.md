# TodoApp


### Schema
#### todo-list
```
    name: string
    todoItems: [todo-item]
```
#### todo-item
```
    title: string
    desc: string
    priority: enum(low | moderate | high)
    completed: boolean
    date_created: date    
```

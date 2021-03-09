//Iterates through each items within each list and add following tags: 'highPriority' and 'pending' todos
export const tagLists = lists => {
    lists.forEach(list => {
        list.highPriorityCount = 0
        list.pendingCount = 0
        list.todo_items.forEach(x => {
            if (x.priority === "high") list.highPriorityCount++
            if (!x.compeleted) list.pendingCount++
        }) 
    })
    return lists
}
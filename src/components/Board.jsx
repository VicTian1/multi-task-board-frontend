import Column from './Column'

export default function Board({taskData, editTask,removeTask, moveTask, onView}){
    
    const todoTasks=taskData.filter(task=>task.status==="TODO")
    const doingTasks=taskData.filter(task=>task.status==="DOING")   
    const doneTasks=taskData.filter(task=>task.status==="DONE")  

    return (
            <main>
                <Column title="To Do" tasks={todoTasks} editTask={editTask} removeTask={removeTask} moveTask={moveTask} onView={onView} />
                <Column title="Doing" tasks={doingTasks} editTask={editTask} removeTask={removeTask} moveTask={moveTask} onView={onView} />
                <Column title="Done" tasks={doneTasks} editTask={editTask} removeTask={removeTask} moveTask={moveTask} onView={onView} />
            </main>
            

       
    )
}
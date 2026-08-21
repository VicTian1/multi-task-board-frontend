import Column from './Column'

export default function Board({taskData, editTask,removeTask, moveTask, onView}){
    
    const todoTasks=taskData.filter(task=>task.status==="TODO").sort((a,b)=>a.index-b.index)
    const doingTasks=taskData.filter(task=>task.status==="DOING").sort((a,b)=>a.index-b.index)  
    const doneTasks=taskData.filter(task=>task.status==="DONE").sort((a,b)=>a.index-b.index)
    

    return (
            <main>
                <Column title="TODO" tasks={todoTasks} editTask={editTask} removeTask={removeTask} moveTask={moveTask} onView={onView} />
                <Column title="DOING" tasks={doingTasks} editTask={editTask} removeTask={removeTask} moveTask={moveTask} onView={onView} />
                <Column title="DONE" tasks={doneTasks} editTask={editTask} removeTask={removeTask} moveTask={moveTask} onView={onView} />
            </main>
            

       
    )
}
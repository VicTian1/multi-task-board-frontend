import Column from './Column'

export default function Board({taskData, editTask,removeTask, moveTask}){
    
    const todoTasks=taskData.filter(task=>task.status==="to do"? true:false)
    const doingTasks=taskData.filter(task=>task.status==="doing"? true:false)   
    const doneTasks=taskData.filter(task=>task.status==="done"? true:false)  

    return (
            <main>
                <Column title="To Do" tasks={todoTasks} editTask={editTask} removeTask={removeTask} moveTask={moveTask} />
                <Column title="Doing" tasks={doingTasks} editTask={editTask} removeTask={removeTask} moveTask={moveTask}/>
                <Column title="Done" tasks={doneTasks} editTask={editTask} removeTask={removeTask} moveTask={moveTask}/>
            </main>
            

       
    )
}
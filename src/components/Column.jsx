import TaskCard from "./TaskCard"
export default function Column({title, tasks,editTask,removeTask,moveTask}){

    const taskCardElements= tasks.map((task)=>{
        return (
            <TaskCard 
                editTask={editTask}
                key={task.id}
                info={task}
                id={task.id}
                removeTask={removeTask}
                moveTask={moveTask}
            />
        )
    })
    return (
    <div className="column" >
        <h2>{title}<span className="task-count">{tasks.length}</span></h2>
        {taskCardElements}
    </div>
    )
}
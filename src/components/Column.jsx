import TaskCard from "./TaskCard"
export default function Column({title, tasks,editTask,removeTask,moveTask,onView}){
    const emptyCard= <div className="task-card empty-card">
        <p>No tasks yet</p>
    </div>
    const taskCardElements= tasks.map((task)=>{
        return (
            <TaskCard 
                editTask={editTask}
                key={task.id}
                info={task}
                id={task.id}
                removeTask={removeTask}
                moveTask={moveTask}
                onView={onView}


            />
        )
    })
    return (
    <section className="column" >
        <h2>{title}<span className="task-count">{tasks.length}</span></h2>
        {tasks.length===0? emptyCard:taskCardElements}

    </section>
    )
}
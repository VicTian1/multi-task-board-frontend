import TaskCard from "./TaskCard"
export default function Column(props){
    const taskCardElements= props.tasks.map((task)=>{
        return (
            <TaskCard 
                key={task.id}
                info={task}
            />
        )
    })
    return (
    <div className="column" >
        <h2>{props.title}<span className="task-count">{props.tasks.length}</span></h2>
        {taskCardElements}
    </div>
    )
}
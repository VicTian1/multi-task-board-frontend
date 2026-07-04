import TaskCard from "./TaskCard"
export default function Column(props){
    return (
    <div className="column" >
        <h2>{props.title}<span className="task-count">2</span></h2>

        <TaskCard 
            title="Learn React"
            label="Study"
            dueDate="15 Jul"
        />
        <TaskCard 
            title="Build Navbar"
            label="Work"
            dueDate="16 Jul"
        />
    </div>
    )
}
import { Droppable } from "@hello-pangea/dnd"
import TaskCard from "./TaskCard"
export default function Column({title, tasks,editTask,removeTask,moveTask,onView,isSearching}){
    const emptyCard= <div className="task-card empty-card">
        <p>{isSearching? "No matching tasks":"No tasks yet"}</p>
    </div>
    const taskCardElements= tasks.map((task,index)=>{
    
        return (
            <TaskCard 
                editTask={editTask}
                key={task.id}
                info={task}
                id={task.id}
                removeTask={removeTask}
                moveTask={moveTask}
                onView={onView}
                index={index}
                isSearching={isSearching}


            />
        )
    })
    return (
        <Droppable droppableId={title}>
            {(provided)=>(
                <section className="column" ref={provided.innerRef} {...provided.droppableProps}>
                    <h2>{title}<span className="task-count">{tasks.length}</span></h2>
                    {tasks.length!==0 && taskCardElements}
                    {provided.placeholder}
                    {tasks.length===0 && emptyCard}
                </section>
            )}
            
        </Droppable>
    )
}
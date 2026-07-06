import Column from './Column'
import todoTasks from '../data/todoData'
import doingTasks from '../data/doingData'
import doneTasks from '../data/doneData'
export default function Board(){
    return (
        <main>
            <Column title="To Do" tasks={todoTasks}/>
            <Column title="Doing" tasks={doingTasks}/>
            <Column title="Done" tasks={doneTasks}/>
        </main>
    )
}
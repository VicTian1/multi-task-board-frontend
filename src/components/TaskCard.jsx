import cardLabels from "../data/cardLabels"
import React from "react"
export default function TaskCard({info, editTask,id,removeTask,moveTask}){
    const [showSelect,setShowSelect]=React.useState(false)
    const {title,label,dueDate}=info
    function getLabelClassName(){
        for(let i=0;i<cardLabels.length;i++){
            if(cardLabels[i].text===label){
                return`task-label ${cardLabels[i].class}`
            }

        }
        return null
    }
    function getDueDateClassName(){
        const today=new Date();
        const targetTime=new Date(dueDate)
        const diffTime=targetTime.getTime()-today.getTime()
        const diffDays=Math.ceil(diffTime/(1000*60*60*24))

        if(diffDays<=1){
            return "task-status task-red"
        }else if(diffDays<=3){
            return "task-status task-yellow"
        }else{
            return "task-status task-green"
        }
    }
    function handleSelect(){
        setShowSelect(prev=>!prev)
    }
    function renderMoveMenu(){
        const doing=<button onClick={()=>moveTask(id,"doing")}>doing</button>
        const todo=<button onClick={()=>moveTask(id,"todo")}>to do</button>
        const done=<button onClick={()=>moveTask(id,"done")}>done</button>
        if (info.status==="to do"){
            return(
                <div>
                    {doing}
                    {done}
                </div>
            )
        }else if(info.status==="doing"){
            return (
                <div>
                    {todo}
                    {done}
                </div>
            )
        }else{
            return (
                <div>
                    {doing}
                    {todo}
                </div>
            )
        }
    }
    return (
        <div className="task-card">
            <div className="task-operation-section">
                <button className="operation-button" onClick={()=>{editTask(id)}}>✏️</button>
                <button className="operation-button" onClick={()=>{removeTask(id)}}>🗑️</button>
                <button className="operation-button" onClick={handleSelect}>▼</button>
                {showSelect && renderMoveMenu()}
            </div>
            <h3>{title}</h3>
            <div className="label-status-section">
                {dueDate && <span className={getDueDateClassName()}>⏱️ {dueDate}</span>}
                {label && <span className={getLabelClassName()}>{label}</span>}
            </div>
        </div>
    )
}
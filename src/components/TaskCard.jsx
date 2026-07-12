import cardLabels from "../data/cardLabels"
import React from "react"
export default function TaskCard({info, editTask,id,removeTask,moveTask,onView}){
    const [showSelect,setShowSelect]=React.useState(false)
    const {title,label,dueDate}=info
    const [shownDeleteConfirm, setShownDeleteConfirm]=React.useState(false)
    function getLabelClassName(){
        
        const cardLabel=cardLabels.find(item=>item.text===label)
        return `task-label ${ cardLabel? cardLabel.class:'label-general'}`
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
        const doing=<button onClick={()=>moveTask(id,"doing")}  className="menu-item">doing</button>
        const todo=<button onClick={()=>moveTask(id,"to do")}  className="menu-item">to do</button>
        const done=<button onClick={()=>moveTask(id,"done")}  className="menu-item">done</button>
        if (info.status==="to do"){
            return(
                <div className="dropdown-menu" onClick={e=>e.stopPropagation()}>
                    {doing}
                    {done}
                </div>
            )
        }else if(info.status==="doing"){
            return (
                <div className="dropdown-menu" onClick={e=>e.stopPropagation()}>
                    {todo}
                    {done}
                </div>
            )
        }else{
            return (
                <div className="dropdown-menu" onClick={e=>e.stopPropagation()}>
                    {doing}
                    {todo}
                </div>
            )
        }
    }
    function openDeleteConfirm(){
        setShownDeleteConfirm(prev=>!prev)
    }
    function deleteConfirm(){
        return(
            <div className="delete-overlay" onClick={e=>{
                e.stopPropagation()
                openDeleteConfirm()
            }}>
                <div onClick={e=>e.stopPropagation()} className="delete-mini-box">
                    <h2>Are you sure you want to delete this task? The action cannot be undone</h2>
                    <div className="delete-actions">
                        <button className="btn-delete" onClick={(e)=>{
                            e.stopPropagation()
                            removeTask(id)
                        }}>Delete</button>
                        <button className="btn-cancel" onClick={(e)=>{
                            e.stopPropagation()
                            openDeleteConfirm()
                        }}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="task-card" onClick={()=>{onView(id)}}>
            <div className="task-operation-section">
                <button className="operation-button" onClick={(e)=>
                {
                    e.stopPropagation()
                    editTask(id)}
                    }>✏️</button>
                <button className="operation-button" onClick={(e)=>
                {
                    e.stopPropagation()
                    openDeleteConfirm()
                    }}>🗑️</button>
                <div className="dropdown-container">
                    <button className="operation-button trigger-button" onClick={(e)=>
                    {

                        e.stopPropagation()
                        handleSelect()
                    }
                        }>▼</button>
                    {showSelect && renderMoveMenu()}
                </div>
            </div>
            <h3>{title}</h3>
            <div className="label-status-section">
                {dueDate && <span className={getDueDateClassName()}>⏱️ {dueDate}</span>}
                {label && <span className={getLabelClassName()}>{label}</span>}
            </div>
            {shownDeleteConfirm && deleteConfirm()}
        </div>
    )
}
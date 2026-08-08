
import React from "react"
export default function TaskForm(props){
 
    const cardLabelElements=props.label.map(label=>{
        return <option key={label.id} value={label.type}>{label.name}</option>
    })
    const inputRef=React.useRef(null)

    const today=new Date().toISOString().split('T')[0];

    React.useEffect(()=>{
        if((props.formMode==="edit"||props.formMode==="add") && inputRef.current){
            inputRef.current.focus()
        }
    },[])

    return (
        <div className="form-overlay" onClick={props.handleClose}>
            <div className="form-container" onClick={e=>e.stopPropagation()}>
                <div className="form-header">
                    <h2>{
                    props.formMode==="view"
                    ? "Task Details"
                    : props.formMode==="edit"
                    ? "Change Your Task"
                    : "Create New Task"
                    }</h2>
                    <button type="button" className="close-x-btn" aria-label="Close dialog" onClick={props.handleClose}>&times;</button>
                </div>
                <form action={props.handleInfo} className="task-form">
                    <div className="form-group">
                        <label htmlFor="title" >title <span className="required-star">*</span>: </label>
                        <input ref={inputRef} id="title" name="title" maxLength={100} type="text" required defaultValue={props.editingTask?.title || "" } readOnly={props.formMode==="view"} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">description: </label>
                        <input id="description" name="description" type="text" maxLength={500} defaultValue={props.editingTask?.description || ""} readOnly={props.formMode==="view"}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="label">label: </label>
                        <select id="label" name="label" defaultValue={props.editingTask?.label || ""} disabled={props.formMode==="view"}  >
                            <option value="" disabled>--choose a label--</option>
                            {cardLabelElements}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueDate">dueDate: </label>
                        <input id="dueDate" name="dueDate" type="date" min={today} defaultValue={props.editingTask?.dueDate ||""} readOnly={props.formMode==="view"}  />
                    </div>
                    {props.formMode!=="view" && <div className="form-actions">
                        <button className="btn-submit" type="submit">{props.formMode==="edit"? "Change":"Add"}</button>
                        <button className="btn-close" onClick={props.handleClose} type="button">Close</button>
                    </div>}
                </form>
            </div>
        </div>
    )
}
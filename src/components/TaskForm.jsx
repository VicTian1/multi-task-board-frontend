import cardLabels from "../data/cardLabels"

export default function TaskForm(props){

    const cardLabelElements=cardLabels.map(label=>{
        return <option key={label.id} value={label.text}>{label.text}</option>
    })

    return (
        <div className="form-overlay">
            <div className="form-container">
                <div className="form-header">
                    <h2>{props.editingTask? "Change Your Tasks":"Create New Task"}</h2>
                    <button type="button" className="close-x-btn" onClick={props.handleClose}>&times;</button>
                </div>
                <form action={props.handleInfo} className="task-form">
                    <div className="form-group">
                        <label htmlFor="title" >title <span className="required-star">*</span>: </label>
                        <input id="title" name="title" type="text" required defaultValue={props.editingTask && props.editingTask.title } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">description: </label>
                        <input id="description" name="description" type="text" defaultValue={props.editingTask && props.editingTask.description} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="label">label: </label>
                        <select id="label" name="label" defaultValue={props.editingTask? props.editingTask.label: ""} >
                            <option value="" disabled>--choose a label--</option>
                            {cardLabelElements}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueDate">dueDate: </label>
                        <input id="dueDate" name="dueDate" type="date" defaultValue={props.editingTask && props.editingTask.dueDate} />
                    </div>
                    <div className="form-actions">
                        <button className="btn-submit" type="submit">{props.editingTask? "Change":"Add"}</button>
                        <button className="btn-close" onClick={props.handleClose} type="button">Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
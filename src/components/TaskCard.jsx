export default function TaskCard(props){
    return (
        <div className="task-card">
            <div className="task-operation-section">
                <button className="operation-button">✏️</button>
                <button className="operation-button">🗑️</button>
                <button className="operation-button">▼</button>
            </div>
            <h3>{props.title}</h3>
            <div className="label-status-section">
                <span className="task-status">⏱️ {props.dueDate}</span>
                <span className="task-label">{props.label}</span>
            </div>
        </div>
    )
}
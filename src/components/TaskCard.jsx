export default function TaskCard(props){
    const {title,label,dueDate}=props.info
    return (
        <div className="task-card">
            <div className="task-operation-section">
                <button className="operation-button">✏️</button>
                <button className="operation-button">🗑️</button>
                <button className="operation-button">▼</button>
            </div>
            <h3>{title}</h3>
            <div className="label-status-section">
                <span className="task-status">⏱️ {dueDate}</span>
                <span className="task-label">{label}</span>
            </div>
        </div>
    )
}
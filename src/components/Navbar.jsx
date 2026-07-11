export default function Navbar(props){
    return (
        <header>
            <nav>
                <span className="app-title">My Multi-Task Board</span>
                <div className="search-section">                   
                    <div className="search-input-group">
                        <input placeholder="Search tasks.." />
                        <button className="nav-button">Search</button>
                    </div>
                    <button className="nav-button" onClick={props.addTask}>+ Add Task</button>
                </div>
            </nav>
        </header>
    )
}
export default function Navbar(props){
    return (
        <header>
            <nav>
                <span className="app-title">My Multi-Task Board</span>

                <div className="search-section">
                    <div className="search-wrapper">                 
                        <form className="search-input-group">
                            <input placeholder="Search tasks..."  onChange={props.handleSearch} />
                        </form>
                        {!props.hasMatchingTask && <div className="search-message">🔍 No matching task</div>}
                    </div>
                    <button className="nav-button" onClick={props.addTask}>+ Add Task</button>
                </div>
            </nav>
        </header>
    )
}
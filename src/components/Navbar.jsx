export default function Navbar(props){

    
    return (
        <header>
            <nav>
                <span className="app-title">My Multi-Task Board</span>

                <div className="search-section">
                    <div className="search-wrapper">                 
                        <form className="search-input-group" onSubmit={e=>e.preventDefault()}>
                            <input aria-label="Search tasks" placeholder="Search tasks..."  type="text" onChange={props.handleSearch} />
                        </form>
                        {!props.hasMatchingTask && <div className="search-message" aria-live="polite">🔍 No matching task</div>}
                    </div>
                    <button className="nav-button" onClick={props.addTask}>+ Add Task</button>
                    <button type="button" className="btn-logout" onClick={props.handleLogout}>Log Out</button>
                </div>
            </nav>
        </header>
    )
}
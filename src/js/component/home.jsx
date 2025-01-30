import React, { useState, useEffect } from "react";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [isLightMode, setIsLightMode] = useState(false);

    const addTask = () => {
        const trimmedTask = newTask.trim();
        if (trimmedTask !== "") {
            setTasks([...tasks, { id: Date.now(), text: trimmedTask }]);
            setNewTask(""); // Clear input
        }
    };

    const deleteTask = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, deleting: true } : task
            )
        );

        setTimeout(() => {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        }, 300);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTask();
        }
    };

    const toggleDarkMode = () => {
        setIsLightMode(!isLightMode);
    };

    useEffect(() => {
        if (isLightMode) {
            document.body.classList.add("light-mode");
        } else {
            document.body.classList.remove("light-mode");
        }
    }, [isLightMode]);

    return (
        <div className="text-center">
            <h1 className="text-center mt-5">todos</h1>

            {/* Dark Mode Toggle Button */}
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                {isLightMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>

            <div className="todo-container">
                {/* Input Field and Add Button */}
                <div className="task-input-container">
                    <input
                        type="text"
                        className="task-input"
                        placeholder="What needs to be done?"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="add-task-button" onClick={addTask}>
                        Add
                    </button>
                </div>

                {/* Task List */}
                <ul className="task-list">
                    {tasks.length === 0 ? (
                        <li className="no-tasks">No tasks, add a task</li>
                    ) : (
                        tasks.map((task) => (
                            <li key={task.id} className={`task-item ${task.deleting ? "deleting" : ""}`}>
                                {task.text}
                                <button
                                    className="delete-button"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    ✕
                                </button>
                            </li>
                        ))
                    )}
                </ul>

                {/* Footer */}
                <div className="footer">
                    {tasks.length > 0
                        ? `${tasks.length} item${tasks.length > 1 ? "s" : ""} left`
                        : ""}
                </div>
            </div>
        </div>
    );
};

export default Home;

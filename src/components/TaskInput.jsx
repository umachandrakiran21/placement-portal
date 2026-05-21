import { useState } from "react"

function TaskInput() {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  function addTask() {

    if(task === ""){
      return
    }

    setTasks([...tasks, task])

    setTask("")
  }

  return (
    <div>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>
        Add
      </button>

      {
        tasks.map((item, index) => (
          <h3 key={index}>{item}</h3>
        ))
      }

    </div>
  )
}

export default TaskInput
import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import deleteIcon from "../../assets/delete.png"

import { db } from "../../firebase/firebase"
import Tag from "../CategoryForm/Tag"
// import "./TaskCard.css"

const TaskCard = ({ task, handleDelete, setActiveCard }) => {
  const [isEditing, setIsEditing] = useState({
    value: false,
    id: null,
  })

  const [selectedInput, setSelectedInput] = useState({
    id: task.id,
    task: task.task,
    description: task.description,
    deadline: task.deadline,
    status: task.status,
    tags: task.tags,
  })
  const handleChange = (e) => {
    const { name, value } = e.target

    // Create a new state based on the previous state
    const updatedState = { ...selectedInput, [name]: value }

    // Update the state
    setSelectedInput(updatedState)

    // Save the latest state to localStorage
    localStorage.setItem(task.id, JSON.stringify(updatedState))
  }

  const handleEdit = () => {
    setIsEditing({
      value: true,
      id: task.id,
    })
    const localTask = localStorage.getItem(task.id)
    if (!localTask) {
      setSelectedInput(task)
    } else {
      const draftedTask = JSON.parse(localTask)
      if (draftedTask.id === task.id) {
        setSelectedInput(draftedTask)
      }
    }
  }

  const updateTodo = async () => {
    if (!selectedInput) return
    try {
      const todoDocRef = doc(db, "todos", task.id)
      await updateDoc(todoDocRef, selectedInput)
    } catch (error) {
      console.log(error)
    }

    setSelectedInput("")
    setIsEditing({
      value: false,
      id: null,
    })
  }

  function daysRemaining(dateStr) {
    // Parse the input date string to a Date object
    const targetDate = new Date(dateStr)
    targetDate.setHours(0, 0, 0, 0) // Set time to midnight for accurate day comparison

    // Get today's date and set time to midnight
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Calculate the difference in milliseconds and convert to days
    const diff = targetDate - today
    const days = diff / (1000 * 60 * 60 * 24)

    // Return the formatted message with the remaining days
    return days
  }

  const remainingDays = daysRemaining(task.deadline)

  return (
    <>
      {isEditing.value & (isEditing.id === task.id) ? (
        <article
          className="w-full h-full flex flex-col gap-2 min-h-[100px] p-3 border border-gray-300 rounded-lg shadow-sm"
          onDragStart={() => setActiveCard(task)}
          onDragEnd={() => setActiveCard(null)}
        >
          <input
            type="text"
            name="task"
            value={selectedInput.task}
            className="w-full flex-1 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
            placeholder="Enter your task"
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            value={selectedInput.description}
            className="w-full flex-1 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
            placeholder="Enter description"
            onChange={handleChange}
          />
          <input
            type="date"
            name="deadline"
            className="w-full flex-1 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
            value={selectedInput.deadline}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-2">
            <div className="flex flex-row flex-wrap gap-1">
              {task.tags.map((tag, index) => (
                <Tag key={index} tagName={tag} selected />
              ))}
            </div>
            <button className="h-5 w-5" onClick={updateTodo}>
              <p>update</p>
            </button>
          </div>
        </article>
      ) : (
        <article
          className="w-full flex flex-col gap-2 min-h-[100px] p-3 border border-gray-300 rounded-lg shadow-sm cursor-grab"
          draggable
          onDragStart={() => setActiveCard(task)}
          onDragEnd={() => setActiveCard(null)}
        >
          <p className="font-bold">Title: {task.task}</p>
          <p className="text-sm text-slate-500">{task.description}</p>
          <p className="task_text">Deadline: {task.deadline}</p>
          <p className="task_text">Status: {task.status}</p>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row flex-wrap gap-1">
              {task.tags.map((tag, index) => (
                <Tag key={index} tagName={tag} />
              ))}
            </div>
          </div>

          <p>
            {remainingDays > 0
              ? `${remainingDays} days remaining`
              : remainingDays === 0
              ? "Deadline ends today"
              : "Deadline has passed"}
          </p>
          <div className="flex flex-row items-center justify-between my-2 border-t pt-2">
            <button
              className="h-full bg-indigo-600 text-white rounded-lg px-3 py-2 font-bold"
              onClick={() => handleDelete(task.id)}
            >
              <img src={deleteIcon} className="h-5" alt="" />
            </button>
            <button
              className="h-full bg-indigo-600 text-white rounded-lg px-3 py-2 font-bold"
              onClick={handleEdit}
            >
              <p>Edit</p>
            </button>
          </div>
        </article>
      )}
    </>
  )
}

export default TaskCard

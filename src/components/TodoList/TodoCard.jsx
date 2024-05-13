import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../firebase/config"
import { deleteTodo } from "../../firebase/database"
import Tag from "../TodoForm/Tag"

const TodoCard = ({ task, setActiveCard }) => {
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
    const updatedState = { ...selectedInput, [name]: value }
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
    const targetDate = new Date(dateStr)
    targetDate.setHours(0, 0, 0, 0)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const diff = targetDate - today
    const days = diff / (1000 * 60 * 60 * 24)

    return days
  }

  const remainingDays = daysRemaining(task.deadline)

  return (
    <>
      {isEditing.value & (isEditing.id === task.id) ? (
        <article
          className="w-full flex flex-col gap-2 min-h-[100px] p-3 border border-gray-300 rounded-lg shadow-sm"
          onDragStart={() => setActiveCard(task)}
          onDragEnd={() => setActiveCard(null)}
        >
          <input
            type="text"
            name="task"
            value={selectedInput.task}
            className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
            placeholder="Enter your task"
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            value={selectedInput.description}
            className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
            placeholder="Enter description"
            onChange={handleChange}
          />
          <input
            type="date"
            name="deadline"
            className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
            value={selectedInput.deadline}
            onChange={handleChange}
          />

          <button
            className="h-full bg-indigo-600 text-white rounded-lg px-3 py-2 font-bold"
            onClick={updateTodo}
          >
            <p>update</p>
          </button>
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
          <div className="flex flex-col gap-2">
            <div className="flex flex-row flex-wrap gap-1 mb-3">
              {task.tags.map((tag, index) => (
                <Tag key={index} tagName={tag} />
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full gap-2 border p-1 rounded-lg">
            <p className="text-sm">Status: {task.status}</p>
            <p className="text-sm text-red-600 ">Deadline: {task.deadline}</p>
          </div>

          <p className="w-full bg-indigo-100 p-1 rounded-lg text-center">
            {remainingDays > 0
              ? `${remainingDays} days remaining`
              : remainingDays === 0
              ? "Deadline ends today"
              : "Deadline has passed"}
          </p>
          <div className="flex flex-row items-center justify-between gap-2 my-2 border-t pt-2">
            <button
              className="h-full flex-1 bg-indigo-600 text-white rounded-lg px-3 py-2 font-bold"
              onClick={handleEdit}
            >
              <p>Edit</p>
            </button>
            <button
              className="h-full flex-1 bg-red-600 text-white rounded-lg px-3 py-2 font-bold"
              onClick={() => deleteTodo(task.id)}
            >
              <p>Delete</p>
            </button>
          </div>
        </article>
      )}
    </>
  )
}

export default TodoCard

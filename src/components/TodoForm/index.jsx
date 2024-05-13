import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"

import { db } from "../../firebase/config"
import useAuth from "../../hooks/useAuth"
import Tag from "./Tag"

const TodoForm = ({ tags }) => {
  const { currentUser } = useAuth()
  const [taskData, setTaskData] = useState({
    task: "",
    description: "",
    status: "todo",
    user: currentUser.email,
    deadline: new Date().toISOString().split("T")[0],
    tags: [],
  })

  const [category, setCategory] = useState("")

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag)
  }

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag)
      setTaskData((prev) => {
        return { ...prev, tags: filterTags }
      })
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] }
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setTaskData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const addTodo = async () => {
    console.log(taskData)
    if (!taskData.task) return
    try {
      await addDoc(collection(db, "todos"), taskData)
      setTaskData({
        id: "",
        task: "",
        description: "",
        user: currentUser.email,
        deadline: new Date().toISOString().split("T")[0],
        status: "backlog",
        tags: [],
      })
    } catch (e) {
      console.log(e)
    }
  }

  const addTag = async () => {
    if (!category) return
    try {
      await addDoc(collection(db, "tags"), { tag: category })
      setCategory("")
    } catch (e) {
      console.log(e)
    }
  }

  console.log(taskData)
  return (
    <div>
      <div className="gap-5 flex flex-col">
        <input
          type="text"
          name="task"
          value={taskData.task}
          placeholder="Enter your task"
          onChange={handleChange}
          className="w-full flex-1 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
        />
        <input
          type="text"
          name="description"
          value={taskData.description}
          placeholder="Enter description"
          onChange={handleChange}
          className="w-full flex-1 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
        />
        <input
          type="date"
          name="deadline"
          value={taskData.deadline}
          onChange={handleChange}
          className="w-full flex-1 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
        />

        <div className="flex flex-row gap-3 items-center mt-5">
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              tagName={tag.tag}
              selectTag={selectTag}
              selected={checkTag(tag.tag)}
            />
          ))}
        </div>
        <button
          className="h-full bg-indigo-600 text-white rounded-lg px-3 py-2 font-bold"
          onClick={addTodo}
        >
          + Add Todo
        </button>
        <div className="flex flex-row gap-3 items-center">
          <input
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
            }}
            placeholder="Add a new label to the list or select from bellow"
            className="w-full flex-1 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
          />
          <button
            className="h-full bg-indigo-600 text-white rounded-lg px-3 py-2 font-bold"
            onClick={addTag}
          >
            + Add label
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoForm

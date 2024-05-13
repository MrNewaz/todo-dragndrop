import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import { db } from "./config"

export const addTag = async (category, setCategory) => {
  if (!category) return
  try {
    await addDoc(collection(db, "tags"), { tag: category })
    setCategory("")
  } catch (e) {
    console.log(e)
  }
}

export const addTodo = async (taskData, setTaskData, currentUser) => {
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

export const deleteTodo = async (id) => {
  try {
    const todoDocRef = doc(db, "todos", id)
    await deleteDoc(todoDocRef)
  } catch (error) {
    console.log(error)
  }
}

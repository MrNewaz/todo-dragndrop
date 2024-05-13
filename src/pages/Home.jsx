import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import TodoForm from "../components/TodoForm"
import TodoColumn from "../components/TodoList/TodoColumn"
import { db } from "../firebase/config"
import useAuth from "../hooks/useAuth"

const Home = () => {
  const { currentUser } = useAuth()
  const [todos, setTodos] = useState([])
  // const [tasks, setTasks] = useState(JSON.parse(oldTasks) || [])
  const [activeCard, setActiveCard] = useState(null)
  const [tags, setTags] = useState([])

  useEffect(() => {
    const todosQuery = query(
      collection(db, "todos"),
      where("user", "==", currentUser.email)
    )
    const unsubscribeTodo = onSnapshot(todosQuery, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    const tagsRef = collection(db, "tags")

    const unsubscribeTags = onSnapshot(tagsRef, (snapshot) => {
      setTags(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    return () => {
      unsubscribeTodo()
      unsubscribeTags()
    }
  }, [currentUser])

  const deleteTodo = async (id) => {
    try {
      const todoDocRef = doc(db, "todos", id)
      await deleteDoc(todoDocRef)
    } catch (error) {
      console.log(error)
    }
  }

  const onDrop = async (status, position) => {
    console.log(status, position)
    if (activeCard == null || activeCard === undefined) return
    try {
      const todoDocRef = doc(db, "todos", activeCard.id)
      await updateDoc(todoDocRef, { ...activeCard, status: status })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className="p-5 w-full flex flex-col">
      <TodoForm tags={tags} />
      <section className="grid grid-cols-3 gap-5">
        <TodoColumn
          title="Backlog"
          tasks={todos}
          status="backlog"
          handleDelete={deleteTodo}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TodoColumn
          title="In Progress"
          tasks={todos}
          status="in progress"
          handleDelete={deleteTodo}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TodoColumn
          title="Completed"
          tasks={todos}
          status="completed"
          handleDelete={deleteTodo}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </section>
    </main>
  )
}

export default Home

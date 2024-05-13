import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import TodoForm from "../components/TodoForm"
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

  return (
    <main className="p-5 w-full flex flex-col">
      <TodoForm tags={tags} />
    </main>
  )
}

export default Home

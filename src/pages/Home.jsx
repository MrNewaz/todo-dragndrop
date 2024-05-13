import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import TodoForm from "../components/TodoForm"
import TodoColumn from "../components/TodoList/TodoColumn"
import { db } from "../firebase/config"
import useAuth from "../hooks/useAuth"
import useFetchTodos from "../hooks/useFetchTodos"

const Home = () => {
  const { currentUser } = useAuth()
  const [todos, setTodos] = useState([])
  const [activeCard, setActiveCard] = useState(null)
  const [tags, setTags] = useState([])

  useFetchTodos(currentUser, setTodos, setTags)

  const onDrop = async (status) => {
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
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TodoColumn
          title="In Progress"
          tasks={todos}
          status="in progress"
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TodoColumn
          title="Completed"
          tasks={todos}
          status="completed"
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </section>
    </main>
  )
}

export default Home

import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect } from "react"
import { db } from "../firebase/config"

export default function useFetchTodos(currentUser, setTodos, setTags) {
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
  }, [currentUser, setTodos, setTags])
}

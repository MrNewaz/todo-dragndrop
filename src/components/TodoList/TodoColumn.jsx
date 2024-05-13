import React from "react"

import DropArea from "../DropArea/DropArea"
import EmptyDropArea from "../DropArea/EmptyDropArea"
import TodoCard from "./TodoCard"

const TodoColumn = ({
  title,
  tasks,
  status,
  handleDelete,
  setActiveCard,
  onDrop,
}) => {
  const filteredTasks = tasks.filter((task) => task.status == status).length
  return (
    <div className="py-5">
      <h2 className="text-center text-xl">{title}</h2>
      {filteredTasks === 0 ? (
        <EmptyDropArea onDrop={() => onDrop(status)} />
      ) : (
        <DropArea onDrop={() => onDrop(status)} />
      )}

      {tasks.map(
        (task) =>
          task.status === status && (
            <React.Fragment key={task.id}>
              <TodoCard
                key={task.id}
                task={task}
                handleDelete={handleDelete}
                setActiveCard={setActiveCard}
              />
              <DropArea onDrop={() => onDrop(status, task.id)} />
            </React.Fragment>
          )
      )}
    </div>
  )
}

export default TodoColumn

import { useState } from "react"

const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false)
  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        onDrop()
        setShowDrop(false)
      }}
      className={
        showDrop
          ? `min-h-10 border border-slate-400 rounded-lg p-4 mb-4 transition-all duration-300`
          : "opacity-0 w-full min-h-10"
      }
    >
      <h1>DropArea</h1>
    </section>
  )
}

export default DropArea

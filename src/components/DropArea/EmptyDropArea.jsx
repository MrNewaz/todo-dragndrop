import { useState } from "react"

const EmptyDropArea = ({ onDrop }) => {
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
          ? `min-h-80 border border-slate-400 rounded-lg p-4 mb-4 transition-all duration-300 mt-5`
          : "opacity-0 w-full min-h-80"
      }
    >
      <h1>DropArea</h1>
    </section>
  )
}

export default EmptyDropArea

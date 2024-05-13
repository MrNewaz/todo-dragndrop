const Tag = ({ tagName, selectTag, selected }) => {
  return (
    <button
      type="button"
      className={`py-2 px-3 rounded-lg text-sm ${
        selected ? "bg-indigo-700 text-white" : "bg-gray-200 text-slate-900"
      }`}
      onClick={() => selectTag(tagName)}
    >
      {tagName}
    </button>
  )
}

export default Tag

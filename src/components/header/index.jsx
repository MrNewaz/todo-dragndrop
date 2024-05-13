import { useNavigate } from "react-router-dom"
import { doSignOut } from "../../firebase/auth"
import useAuth from "../../hooks/useAuth"

const Header = () => {
  const navigate = useNavigate()
  const { userLoggedIn } = useAuth()

  return (
    <nav className="bg-indigo-600 shadow-xl p-5">
      {userLoggedIn ? (
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="text-xl text-white" to={"/"}>
            Drag and Drop Todo
          </h1>

          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login")
              })
            }}
            className="text-xl text-white bg-red-500 rounded-lg px-3 py-1 hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="place-content-center w-full">
          <h1 className="text-xl text-center text-white" to={"/"}>
            Drag and Drop Todo
          </h1>
        </div>
      )}
    </nav>
  )
}

export default Header

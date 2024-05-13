import { useRoutes } from "react-router-dom"
import { AuthProvider } from "./contexts/authContext"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  const routesArray = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]
  let routesElement = useRoutes(routesArray)
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen w-full">
        {/* Proper Header */}
        <header>Header</header>

        {/* Main Content */}
        <main className="w-full flex flex-col flex-1 h-full">
          {routesElement}
        </main>

        {/* Proper Footer */}
        <footer>Footer</footer>
      </div>
    </AuthProvider>
  )
}

export default App

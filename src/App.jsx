import { useRoutes } from "react-router-dom"
import Header from "./components/header"
import { AuthProvider } from "./contexts/authContext"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./utils/ProtectedRoute"

function App() {
  const routesArray = [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
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
        <Header />
        <main className="w-full flex flex-col flex-1 h-full">
          {routesElement}
        </main>
      </div>
    </AuthProvider>
  )
}

export default App

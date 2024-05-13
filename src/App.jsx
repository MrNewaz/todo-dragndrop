import { useRoutes } from "react-router-dom"
import Home from "./pages/Home"

function App() {
  const routesArray = [
    {
      path: "/",
      element: <Home />,
    },
  ]
  let routesElement = useRoutes(routesArray)
  return (
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
  )
}

export default App

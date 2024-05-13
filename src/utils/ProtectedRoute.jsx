import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const { currentUser } = useAuth()
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return children
}

export default ProtectedRoute

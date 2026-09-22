import { createContext, useContext, useState, useEffect } from 'react'
import { adminApi } from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      adminApi.getProfile()
        .then(res => {
          setUser(res.data.data)
        })
        .catch(() => {
          localStorage.removeItem('admin_token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await adminApi.login({ email, password })
    const { token, user } = res.data.data
    localStorage.setItem('admin_token', token)
    setUser(user)
    toast.success('Welcome back!')
    return true
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setUser(null)
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

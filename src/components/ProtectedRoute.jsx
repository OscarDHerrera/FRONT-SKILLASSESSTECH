import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { React, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export default function ProtectedRoute ({ children }) {
  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
  }

  const [isAuthorized, setIsAuthorized] = useState(null)

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false))
  }, [])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    try {
      const response = await api.post('/account/token/refresh/', {
        refresh: refreshToken
      })
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access)
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
      }
    } catch (error) {
      console.error(error)
      setIsAuthorized(false)
    }
  }

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (!token) {
      setIsAuthorized(false)
      return
    }

    try {
      const decoded = jwtDecode(token)
      const tokenExp = decoded.exp
      const now = Date.now() / 1000

      if (tokenExp < now) {
        await refreshToken()
      }
      setIsAuthorized(true)
    } catch (error) {
      setIsAuthorized(false)
    }
  }

  if (isAuthorized === null) {
    return <div> Loading... </div>
  }

  return isAuthorized ? children : <Navigate to='/login' />
}

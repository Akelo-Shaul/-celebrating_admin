import React, { createContext, useContext, useState } from 'react'
import NotificationModal from '../components/common/NotificationModal'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openNotification = () => {
    setIsOpen(true)
  }

  const closeNotification = () => {
    setIsOpen(false)
  }

  const toggleNotification = () => {
    setIsOpen(!isOpen)
  }

  return (
    <NotificationContext.Provider value={{ openNotification, closeNotification, toggleNotification, isOpen }}>
      {children}
      <NotificationModal
        isOpen={isOpen}
        onClose={closeNotification}
      />
    </NotificationContext.Provider>
  )
}







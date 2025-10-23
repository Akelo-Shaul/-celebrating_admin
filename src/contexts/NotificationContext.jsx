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
  const [recipient, setRecipient] = useState(null)

  const openNotification = (user) => {
    setRecipient(user)
    setIsOpen(true)
  }

  const closeNotification = () => {
    setIsOpen(false)
    // Don't clear recipient immediately to allow for smooth transition
    setTimeout(() => setRecipient(null), 300)
  }

  return (
    <NotificationContext.Provider value={{ openNotification, closeNotification }}>
      {children}
      <NotificationModal 
        isOpen={isOpen} 
        onClose={closeNotification} 
        recipient={recipient}
      />
    </NotificationContext.Provider>
  )
}



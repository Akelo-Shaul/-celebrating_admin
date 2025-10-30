import React, { createContext, useContext, useState } from 'react'
import MessagingModal from '../components/common/MessagingModal'

const MessagingContext = createContext()

export const useMessaging = () => {
  const context = useContext(MessagingContext)
  if (!context) {
    throw new Error('useMessaging must be used within a MessagingProvider')
  }
  return context
}

export const MessagingProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [recipient, setRecipient] = useState(null)

  const openMessage = (user) => {
    setRecipient(user)
    setIsOpen(true)
  }

  const openAllMessages = () => {
    setRecipient(null)
    setIsOpen(true)
  }

  const closeMessage = () => {
    setIsOpen(false)
    // Don't clear recipient immediately to allow for smooth transition
    setTimeout(() => setRecipient(null), 300)
  }

  return (
    <MessagingContext.Provider value={{ openMessage, openAllMessages, closeMessage }}>
      {children}
      <MessagingModal 
        isOpen={isOpen} 
        onClose={closeMessage} 
        recipient={recipient}
      />
    </MessagingContext.Provider>
  )
}






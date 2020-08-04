import React from 'react'
import { authStore } from './authStore'
import { uiStore } from './uiStore'
import { useLocalStore } from 'mobx-react-lite'

const storeContext = React.createContext({
  auth: undefined,
  ui: undefined
})

export const StoreProvider = ({ children }) => {
  const auth = useLocalStore(authStore)
  const ui = useLocalStore(uiStore)
  return <storeContext.Provider value={{auth, ui}}>{children}</storeContext.Provider>
}

export const useStore = () => {
  return React.useContext(storeContext)
}
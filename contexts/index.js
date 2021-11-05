import React, { useState } from "react"

export const AppContext = React.createContext({
  search: '',
  setSearch: () => {},
})

export const AppContextProvider = ({ children }) => {
  const [search, setSearch] = useState('')

  const contextValue = {
    search,
    setSearch,
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

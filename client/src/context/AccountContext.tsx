import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface User {
  email: string
  token: string
}

interface AccountContextValue {
  user: User | null
  setUser: (user: User) => void
}

const AccountContext = createContext<AccountContextValue | undefined>(undefined)

export const AccountProvider = ({ children }: PropsWithChildren<any>) => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <AccountContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export const useAccountContext = () => {
  const context = useContext(AccountContext)
  if (!context) throw Error('Oops - we do not seem to be inside the provider')
  return context
}

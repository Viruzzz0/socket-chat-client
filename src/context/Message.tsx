import { createContext, useState } from 'react'

interface ContextProps {
  selectRoom: string
  setSelectRoom: (room: string) => void
  user: string
  setUser: (room: string) => void
}

export const MessageContext = createContext<ContextProps>({} as any)

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const MessageProvider: React.FC<Props> = ({ children }) => {
  const [selectRoom, setSelectRoom] = useState<string>('ROOM1')
  const [user, setUser] = useState<string>('')

  return (
    <MessageContext.Provider value={{
      selectRoom,
      setSelectRoom,
      user,
      setUser
    }}
    >
      {children}
    </MessageContext.Provider>
  )
}

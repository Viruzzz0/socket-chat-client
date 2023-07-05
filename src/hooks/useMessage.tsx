import io from 'socket.io-client'
import { type Message, type CollectionRoom } from '../types'
import { useState, useEffect, useContext } from 'react'
import { MessageContext } from '../context/Message'

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const API_URL: string = import.meta.env.VITE_API_URL || process.env.VITE_API_URL
const socket = io(API_URL)

const initialCollectionRoom = [
  {
    name: 'ROOM1',
    content: []
  },
  {
    name: 'ROOM2',
    content: []
  },
  {
    name: 'ROOM3',
    content: []
  }
]

interface useMessageReturnType {
  user: string
  messages: Message[]
  sendMessage: (message: string, room: string, user: string) => void
  changeSelectRoom: (room: string) => void
}

const useMessage = (): useMessageReturnType => {
  const { selectRoom, setSelectRoom, user } = useContext(MessageContext)
  const [collectionsRoom, setCollectionsRoom] = useState<CollectionRoom[]>(initialCollectionRoom)
  const [messages, setMessages] = useState<Message[]>([])
  const userId = 'tota'

  const sendMessage = (message: string, room: string, user: string): void => {
    const newMessage: Message = {
      body: message,
      from: user,
      room
    }
    socket.emit(userId, newMessage)

    setMessages([...messages, newMessage])
    setCollectionsRoom((prev) => {
      const indexRoom = prev.findIndex(item => item.name === newMessage.room)
      prev[indexRoom].content.push(newMessage)

      return [...prev]
    })
  }

  const changeSelectRoom = (room: string): void => {
    const indexRoom = collectionsRoom.findIndex(item => item.name === room)
    setSelectRoom(room)
    setMessages(collectionsRoom[indexRoom].content)
  }

  useEffect(() => {
    const receiveMessage = (message: Message): void => {
      console.log('collectionsRoom :>> ', collectionsRoom)
      if (message.room === selectRoom) {
        setMessages([...messages, message])
      }

      const indexRoom = collectionsRoom.findIndex(item => item.name === message.room)
      collectionsRoom[indexRoom].content.push(message)
    }

    collectionsRoom.forEach(item => socket.on(item.name, receiveMessage))

    return () => {
      collectionsRoom.forEach(item => socket.off(item.name, receiveMessage))
    }
  }, [messages, selectRoom])

  return {
    user,
    messages,
    sendMessage,
    changeSelectRoom
  }
}

export default useMessage

import './App.css'
import io from 'socket.io-client'
import { useState, type FormEvent, useEffect, type ChangeEvent } from 'react'

const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL
const socket = io(API_URL)

interface Message {
  body: string
  from: string | number
  room: string
}

interface CollectionRoom {
  name: string
  content: Message[]
}

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

function App (): JSX.Element {
  const [user, setUser] = useState<string>('')
  const [room, setRoom] = useState<string>('ROOM1')
  const [collectionsRoom, setCollectionsRoom] = useState<CollectionRoom[]>(initialCollectionRoom)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])

  const userId = 'tota'

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
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

    setMessage('')
  }

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value
    const indexRoom = collectionsRoom.findIndex(item => item.name === value)
    setRoom(value)
    setMessages(collectionsRoom[indexRoom].content)
  }

  useEffect(() => {
    const receiveMessage = (message: Message): void => {
      console.log('collectionsRoom :>> ', collectionsRoom)
      if (message.room === room) {
        setMessages([...messages, message])
      }

      const indexRoom = collectionsRoom.findIndex(item => item.name === message.room)
      collectionsRoom[indexRoom].content.push(message)
    }

    collectionsRoom.forEach(item => socket.on(item.name, receiveMessage))

    return () => {
      collectionsRoom.forEach(item => socket.off(item.name, receiveMessage))
    }
  }, [messages, room])

  return (
    <div className='h-screen text-white fon'>
      <section className='w-9/12 flex flex-col mx-auto px-14 py-10 gap-5'>

        <div className='flex flex-col gap-2'>
          <h1 className='font-medium text-3xl'>Chat Live</h1>
          <div>
            <div className="relative flex gap-2">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="countries"
                value={room}
                onChange={handleChangeSelect}
              >
                <option value="ROOM1">room1</option>
                <option value="ROOM2">room2</option>
                <option value="ROOM3">room3</option>
              </select>
            </div>
          </div>
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
              Send
            </label>
            <div className="relative flex gap-2">
              <input
                type="text"
                id="default-search"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
              border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                   dark:focus:border-blue-500" placeholder="User"
                required
                onChange={(e) => { setUser(e.target.value) }}
                value={user}
              />

            </div>
          </form>
          <form name='default-search' onSubmit={handleSubmit}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
              Send
            </label>
            <div className="relative flex gap-2">
              <input
                type="text"
                id="default-search"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
              border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                   dark:focus:border-blue-500" placeholder="Message"
                required
                onChange={(e) => { setMessage(e.target.value) }}
                value={message}
              />

              <button
                type="submit"
                className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm
                px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Send
              </button>
            </div>
          </form>

        </div>

        <div className='flex flex-col gap-2'>
          {messages.map((message, index) => (
            <div
              className={` flex ${message.from === user ? 'justify-end' : 'justify-start'}`}
              key={index}
            >
              <div className={`${message.from === user ? 'bg-sky-600' : 'bg-slate-600'} rounded-md p-2`}>
                <p>{message.from}: {message.body}</p>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  )
}

export default App

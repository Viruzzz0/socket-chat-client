import { type FormEvent, type ChangeEvent } from 'react'
import { useContext, useState } from 'react'
import { MessageContext } from '../context/Message'

interface Props {
  sendMessage: (message: string, room: string, user: string) => void
  changeSelectRoom: (room: string) => void
}

const Input: React.FC<Props> = ({ sendMessage, changeSelectRoom }) => {
  const { selectRoom, user, setUser } = useContext(MessageContext)
  const [message, setMessage] = useState<string>('')

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    sendMessage(message, selectRoom, user)
  }

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value
    changeSelectRoom(value)
  }

  return (
    <>
      <div className="relative flex gap-2">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="countries"
          value={selectRoom}
          onChange={handleChangeSelect}
        >
          <option value="ROOM1">room1</option>
          <option value="ROOM2">room2</option>
          <option value="ROOM3">room3</option>
        </select>
      </div>

      <form
        className='flex flex-col gap-2'
        name='default-search'
        onSubmit={handleSubmit}
      >
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
    </>
  )
}

export default Input

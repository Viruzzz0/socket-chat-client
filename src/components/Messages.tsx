import { type Message as MessageType } from '../types'

type ListOfMessages = MessageType[]

interface Props {
  messages: ListOfMessages
  user: string
}

const Messages: React.FC<Props> = ({ messages, user }) => {
  return (
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
  )
}

export default Messages

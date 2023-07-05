import Messages from './components/Messages'
import Input from './components/Input'
import useMessage from './hooks/useMessage'

function App (): JSX.Element {
  const { user, messages, sendMessage, changeSelectRoom } = useMessage()

  return (
    <div className='h-screen text-white fon'>
      <section className='w-9/12 flex flex-col mx-auto px-14 py-10 gap-5'>

        <div className='flex flex-col gap-2'>
          <h1 className='font-medium text-3xl'>Chat Live</h1>

          <Input
            sendMessage={sendMessage}
            changeSelectRoom={changeSelectRoom}
          />
        </div>
        <Messages
          messages={messages}
          user={user}
        />

      </section>
    </div>
  )
}

export default App

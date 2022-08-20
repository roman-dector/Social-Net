import styles from './Chat.module.scss'

import { FC, useEffect } from 'react'
import { ChatMessageType } from '../../../dal/chatAPI'
import { useDispatch, useSelector } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import { selectChatMessages } from '../../../redux/ducks/chat/selectors'
import { setChatMessages } from '../../../redux/ducks/chat/actions'
import {
  startMessageListening,
  stopMessageListening,
  sendMessage,
} from '../../../redux/ducks/chat/operations'

const Chat = () => {
  const dispatch = useDispatch()
  const messages = useSelector(selectChatMessages)

  useEffect(() => {
    debugger
    dispatch(startMessageListening())
    debugger

    return () => {
      debugger
      // dispatch(stopMessageListening())
    }
  }, [])

  return (
    <div>
      <MessageViewArea messages={messages} />

      <NewMessageArea />
    </div>
  )
}

const MessageViewArea: FC<{ messages: ChatMessageType[] }> = props => {
  return (
    <div className={styles.messageViewArea}>
      {props.messages.map(e => (
        <ChatMessage key={e.userId + Date.now()} {...e} />
      ))}
    </div>
  )
}

const ChatMessage: FC<ChatMessageType> = props => {
  return (
    <div className={styles.chatMessage}>
      <img src={props.photo} />
      <div>
        <div className={styles.userName}>{props.userName}</div>
        <div className={styles.messageContent}>{props.message}</div>
      </div>
    </div>
  )
}

const NewMessageArea: FC<{}> = props => {
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm<{ message: string }>()

  const onSubmit: SubmitHandler<{ message: string }> = data => {
    console.log(data.message)
    dispatch(sendMessage(data.message))
  }

  return (
    <form className={styles.newMessageArea} onSubmit={handleSubmit(onSubmit)}>
      <textarea className={styles.messageInput} {...register('message')} />
      <input className={styles.submitButton} type='submit' />
    </form>
  )
}

export default Chat

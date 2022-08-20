import styles from './Dialogs.module.css'

import { useEffect } from 'react'
import { dialogsAPI } from '../../../dal/api'
import { useSelector } from 'react-redux'

import { selectStartedDialogs } from '../../../redux/ducks/dialogs/selectors' 

const Dialogs = () => {
  const startedDialogs = useSelector(selectStartedDialogs)

  useEffect(() => {
    dialogsAPI.startDialogWithUser(21684).then(data => {
      console.log(data)
    })
    // dialogsAPI.getStartedDialogs().then(data => {
    //   console.log(data)
    // })
    // dialogsAPI.getDialogMessages(25560).then(data => {
    //   console.log(data)
    // })

    // Error
    // dialogsAPI.sendMessageToUser(17964, 'Hello').then(data => {
    //   console.log(data)
    // }).catch(err => console.log(err))
    

  }, [])

  return (
    <div className={styles.dialogsPage}>
      <div className={styles.startedChats}>
        {
          startedDialogs.map(() => (
            <UserChatPreview />
          ))
        }
      </div>
      <div className={styles.currentChatWindow}></div>
    </div>
  )
}

const UserChatPreview = () => {
  return <input type={'submit'} />
}

export default Dialogs

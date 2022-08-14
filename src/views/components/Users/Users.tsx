import styles from './Users.module.scss'

import { Dispatch, FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { UserItemType } from '../../../redux/ducks/users/types'
import {
  selectUsersItems,
  selectTotalUsersCount,
} from '../../../redux/ducks/users/selectors'
import { getUsers } from '../../../redux/ducks/users/operations'
import { toggleIsGettingUsersItems } from '../../../redux/ducks/users/actions'

import { Pagination } from './Pagination/Pagination'

const Users = () => {
  const dispatch = useDispatch()
  const usersItems = useSelector(selectUsersItems)
  const totalUsersCount = useSelector(selectTotalUsersCount)

  const [numberOfUsersOnPage, setNumberOfUsersOnPage] = useState(10)
  const [currentUsersPageNumber, setCurrentUsersPageNumber] = useState(1)

  const amountOfUsersPages = Math.ceil(totalUsersCount / numberOfUsersOnPage)

  const getUsersItems = (dispatch: Dispatch<any>) => {
    dispatch(toggleIsGettingUsersItems(true))
    dispatch(
      getUsers({
        count: numberOfUsersOnPage,
        page: currentUsersPageNumber,
      })
    )
  }

  useEffect(() => {
    if (currentUsersPageNumber === 1) {
      getUsersItems(dispatch)
    } else {
      setCurrentUsersPageNumber(1)
    }
  }, [numberOfUsersOnPage])

  useEffect(() => {
    getUsersItems(dispatch)
  }, [currentUsersPageNumber])

  return (
    <div className={styles.users}>
      <div className={styles.usersListControl}>
        <Pagination
          amountOfUsersPages={amountOfUsersPages}
          currentPage={currentUsersPageNumber}
          setCurrentUsersPageNumber={setCurrentUsersPageNumber}
        />
        <UsersOnPage
          numberOfUsersOnPage={numberOfUsersOnPage}
          setNumberOfUsersOnPage={setNumberOfUsersOnPage}
        />
        <SearchUsers />
      </div>

      <div className={styles.usersItems}>
        {usersItems.map((userItem, index) => (
          <UserPreviewCard key={index} {...userItem} />
        ))}
      </div>
    </div>
  )
}

type UsersOnPagePropsType = {
  numberOfUsersOnPage: number
  setNumberOfUsersOnPage: React.Dispatch<React.SetStateAction<number>>
}

const UsersOnPage: FC<UsersOnPagePropsType> = props => {
  const [contentVisible, setContentVisible] = useState(false)

  return (
    <div
      className={styles.usersOnPage}
      onMouseLeave={() => {
        setContentVisible(false)
      }}
    >
      <div
        className={styles.showOptionsButton}
        onClick={() => {
          setContentVisible(!contentVisible)
        }}
      >
        <span>On page: {props.numberOfUsersOnPage}</span>
        <svg transform={contentVisible ? 'rotate(180)' : ''}>
          <rect x='10' y='1' width='8' height='3' transform='rotate(45)' />
          <rect x='-4' y='15' width='8' height='3' transform='rotate(-45)' />
        </svg>
      </div>

      <div className={styles.gap} />

      <div className={contentVisible ? undefined : styles.hidden}>
        <div className={styles.options}>
          <option
            value={10}
            onClick={e => {
              props.setNumberOfUsersOnPage(Number(e.currentTarget.value))
              setContentVisible(false)
            }}
          >
            10
          </option>
          <option
            value={50}
            onClick={e => {
              props.setNumberOfUsersOnPage(Number(e.currentTarget.value))
              setContentVisible(false)
            }}
          >
            50
          </option>
          <option
            value={100}
            onClick={e => {
              props.setNumberOfUsersOnPage(Number(e.currentTarget.value))
              setContentVisible(false)
            }}
          >
            100
          </option>
        </div>
      </div>
    </div>
  )
}

const SearchUsers = () => {
  return <div />
}

const UserPreviewCard: FC<UserItemType> = props => {
  return (
    <div className={styles.userPreviewCard}>
      <div>Name: {props.name}</div>
      <div>Status: {props.status}</div>
    </div>
  )
}

export default Users

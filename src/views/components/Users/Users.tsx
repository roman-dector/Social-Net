import styles from './Users.module.scss'

import { FC, useEffect, useState } from 'react'
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

  useEffect(() => {
    dispatch(toggleIsGettingUsersItems(true))
    dispatch(
      getUsers({
        count: numberOfUsersOnPage,
        page: currentUsersPageNumber,
      })
    )
  }, [numberOfUsersOnPage, currentUsersPageNumber])

  return (
    <div className={styles.users}>
      <div>
        <Pagination
          amountOfUsersPages={amountOfUsersPages}
          currentPage={currentUsersPageNumber}
          setCurrentUsersPageNumber={setCurrentUsersPageNumber}
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

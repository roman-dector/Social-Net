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
import { UsersOnPageSwitcher } from './UsersOnPageSwitcher/UsersOnPageSwitcher'
import { UsersFilter } from './UsersFilter/UsersFilter'
import { UsersSearch } from './UsersSearch/UsersSearch'

const Users = () => {
  const dispatch = useDispatch()

  const usersItems = useSelector(selectUsersItems)
  const totalUsersCount = useSelector(selectTotalUsersCount)

  const [currentUsersPageNumber, setCurrentUsersPageNumber] = useState(1)
  const [numberOfUsersOnPage, setNumberOfUsersOnPage] = useState(10)
  const [filterUsers, setFilterUsers] = useState<string | undefined>(undefined)
  const [searchUsersTerm, setSearchUsersTerm] = useState<string | undefined>(undefined)

  const amountOfUsersPages = Math.ceil(totalUsersCount / numberOfUsersOnPage)

  const getUsersItems = () => {
    dispatch(toggleIsGettingUsersItems(true))
    dispatch(
      getUsers({
        count: numberOfUsersOnPage,
        page: currentUsersPageNumber,
        friend: filterUsers,
        term: searchUsersTerm,
      })
    )
  }

  useEffect(() => {
    if (currentUsersPageNumber === 1) {
      getUsersItems()
    } else {
      setCurrentUsersPageNumber(1)
    }
  }, [numberOfUsersOnPage, filterUsers, searchUsersTerm])

  useEffect(() => {
    getUsersItems()
  }, [currentUsersPageNumber])

  return (
    <div className={styles.users}>
      <div className={styles.usersListControl}>
        <UsersSearch setSearchUsersTerm={setSearchUsersTerm} />

        <UsersOnPageSwitcher
          numberOfUsersOnPage={numberOfUsersOnPage}
          setNumberOfUsersOnPage={setNumberOfUsersOnPage}
        />

        <UsersFilter setFilterUsers={setFilterUsers} />
      </div>

      <div className={styles.usersItems}>
        {usersItems.map((userItem, index) => (
          <UserPreviewCard key={index} {...userItem} />
        ))}
      </div>

      <div className={styles.usersPageBottom}>
        <Pagination
          amountOfUsersPages={amountOfUsersPages}
          currentPage={currentUsersPageNumber}
          setCurrentUsersPageNumber={setCurrentUsersPageNumber}
        />
      </div>
    </div>
  )
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

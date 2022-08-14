import styles from './UsersFilter.module.scss'

import { FC, useState } from 'react'

type UsersFilter = {
  setFilterUsers: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const UsersFilter: FC<UsersFilter> = props => {
  const [contentVisible, setContentVisible] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')

  const onOptionClickHandler = (
    e: React.MouseEvent<HTMLOptionElement, MouseEvent>
  ) => {
    props.setFilterUsers(e.currentTarget.value)
    setContentVisible(false)
    setSelectedFilter(e.currentTarget.innerText)
  }

  return (
    <div
      className={styles.usersFilter}
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
        <span>Show: {selectedFilter}</span>
        <svg transform={contentVisible ? 'rotate(180)' : ''}>
          <rect x='10' y='1' width='8' height='3' transform='rotate(45)' />
          <rect x='-4' y='15' width='8' height='3' transform='rotate(-45)' />
        </svg>
      </div>

      <div className={styles.gap} />

      <div className={contentVisible ? undefined : styles.hidden}>
        <div className={styles.options}>
          <option value={''} onClick={onOptionClickHandler}>
            all
          </option>
          <option value={'true'} onClick={onOptionClickHandler}>
            followed
          </option>
          <option value={'false'} onClick={onOptionClickHandler}>
            not followed
          </option>
        </div>
      </div>
    </div>
  )
}

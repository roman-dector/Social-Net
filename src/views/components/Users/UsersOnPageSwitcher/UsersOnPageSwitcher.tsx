import styles from './UsersOnPageSwitcher.module.scss'

import { FC, useState } from 'react'

type UsersOnPagePropsType = {
  numberOfUsersOnPage: number
  setNumberOfUsersOnPage: React.Dispatch<React.SetStateAction<number>>
}

export const UsersOnPageSwitcher: FC<UsersOnPagePropsType> = props => {
  const [contentVisible, setContentVisible] = useState(false)

  const onOptionClickHandler = (e: React.MouseEvent<HTMLOptionElement, MouseEvent>) => {
    props.setNumberOfUsersOnPage(Number(e.currentTarget.value))
    setContentVisible(false)
  }

  return (
    <div
      className={styles.usersOnPageSwitcher}
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
            onClick={onOptionClickHandler}
          >
            10
          </option>
          <option
            value={50}
            onClick={onOptionClickHandler}
          >
            50
          </option>
          <option
            value={100}
            onClick={onOptionClickHandler}
          >
            100
          </option>
        </div>
      </div>
    </div>
  )
}

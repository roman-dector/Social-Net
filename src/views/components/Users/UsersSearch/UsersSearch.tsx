import styles from './UsersSearch.module.scss'

import { FC, useState } from 'react'

type UsersSearchPropsType = {
  setSearchUsersTerm: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const UsersSearch: FC<UsersSearchPropsType> = props => {
  const [inputValue, setInputValue] = useState('')
  return (
    <div className={styles.usersSearch}>
      <input
        type={'text'}
        value={inputValue}
        onChange={e => {
          setInputValue(e.currentTarget.value)
        }}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            props.setSearchUsersTerm(inputValue)
          }
        }}
        onBlur={() => {
          if (inputValue in ['', undefined, null]) {
            props.setSearchUsersTerm(inputValue)
          }
        }}
      />
      <div
        className={styles.submitButton}
        onClick={() => {props.setSearchUsersTerm(inputValue)}}
      >
        <svg>
          <circle
            r='8'
            cx='15'
            cy='15'
            fill='none'
            stroke='aqua'
            strokeWidth='2'
          />
          <rect
            x={'28'}
            y={'-2'}
            width={'14'}
            height={'3'}
            fill='aqua'
            transform='rotate(48)'
          />
        </svg>
      </div>
    </div>
  )
}

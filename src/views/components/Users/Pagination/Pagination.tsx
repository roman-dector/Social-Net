import styles from './Pagination.module.scss'

import { FC, useEffect, useState } from 'react'

import {
  PaginationPropsType,
  PaginationButtonPropsType,
  PaginationButtonsContainerPropsType,
} from './PaginationTypes'

export const Pagination: FC<PaginationPropsType> = props => {
  const PAGINATION_LENGTH = 5
  const [[leftEnd, rightEnd], setBorders] = useState([0, PAGINATION_LENGTH])

  const moveRight = () => {
    if (rightEnd !== props.amountOfUsersPages) {
      setBorders([leftEnd + 1, rightEnd + 1])
    }
  }
  const moveLeft = () => {
    if (leftEnd !== 0) {
      setBorders([leftEnd - 1, rightEnd - 1])
    }
  }
  const moveEnd = () => {
    setBorders([
      props.amountOfUsersPages - PAGINATION_LENGTH,
      props.amountOfUsersPages,
    ])
  }
  const moveStart = () => {
    setBorders([0, PAGINATION_LENGTH])
  }

  useEffect(() => {
    moveLeft()
  }, [props.amountOfUsersPages])

  return (
    <div className={styles.pagination}>
      <MoveStart onClickHandler={moveStart} />
      <MoveLeft onClickHandler={moveLeft} />

      <PaginationButtonsContainer
        {...props}
        leftEnd={leftEnd}
        rightEnd={rightEnd}
      />

      <MoveRight onClickHandler={moveRight} />
      <MoveEnd onClickHandler={moveEnd} />
    </div>
  )
}

const MoveLeft: FC<{ onClickHandler: () => void }> = props => (
  <div className={styles.move} onClick={props.onClickHandler}>
    <svg>
      <polygon className={styles.firstPoly} points='10,10 5,20 10,30' />
      <polygon className={styles.secondPoly} points='12,10 7,20 12,30' />
    </svg>
  </div>
)

const MoveRight: FC<{ onClickHandler: () => void }> = props => (
  <div className={styles.move} onClick={props.onClickHandler}>
    <svg>
      <polygon className={styles.firstPoly} points='10,10 15,20 10,30' />
      <polygon className={styles.secondPoly} points='8,10 13,20 8,30' />
    </svg>
  </div>
)

const MoveStart: FC<{ onClickHandler: () => void }> = props => (
  <div className={styles.move} onClick={props.onClickHandler}>
    <svg>
      <polygon className={styles.firstPoly} points='9,10 4,20 9,30' />
      <polygon className={styles.secondPoly} points='11,10 6,20 11,30' />

      <polygon className={styles.firstPoly} points='14,10 9,20 14,30' />
      <polygon className={styles.secondPoly} points='16,10 11,20 16,30' />
    </svg>
  </div>
)

const MoveEnd: FC<{ onClickHandler: () => void }> = props => (
  <div className={styles.move} onClick={props.onClickHandler}>
    <svg>
      <polygon className={styles.firstPoly} points='11,10 16,20 11,30' />
      <polygon className={styles.secondPoly} points='9,10 14,20 9,30' />

      <polygon className={styles.firstPoly} points='6,10 11,20 6,30' />
      <polygon className={styles.secondPoly} points='4,10 9,20 4,30' />
    </svg>
  </div>
)

const PaginationButtonsContainer: FC<
  PaginationButtonsContainerPropsType
> = props => (
  <div className={styles.buttons}>
    {Array.from(Array(props.amountOfUsersPages).keys())
      .slice(props.leftEnd, props.rightEnd)
      .map((pageNum, index) => {
        return (
          <PaginationButton
            key={index}
            pageNumber={pageNum + 1}
            selected={props.currentPage === pageNum + 1 ? true : false}
            setCurrentUsersPageNumber={props.setCurrentUsersPageNumber}
          />
        )
      })}
  </div>
)

const PaginationButton: FC<PaginationButtonPropsType> = props => {
  return (
    <button
      onClick={() => {
        props.setCurrentUsersPageNumber(props.pageNumber)
        window.scrollTo(0, 0)
      }}
      className={props.selected ? styles.currentPage : ''}
    >
      {props.pageNumber}
    </button>
  )
}

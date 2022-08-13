export type PaginationPropsType = {
  amountOfUsersPages: number
  currentPage: number
  setCurrentUsersPageNumber: React.Dispatch<React.SetStateAction<number>>
}

export type PaginationButtonPropsType = {
  pageNumber: number
  selected: boolean
  setCurrentUsersPageNumber: React.Dispatch<React.SetStateAction<number>>
}

export type PaginationButtonsContainerPropsType =
  PaginationPropsType & {leftEnd: number, rightEnd: number}


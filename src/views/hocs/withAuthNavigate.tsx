import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { selectIsUserAuthed } from '../../redux/ducks/auth/selectors'

const withAuthNavigate = (Component: FC) => {
  const ComponentContainer = (props: any) => {
    const isUserAuthed: boolean = useSelector(selectIsUserAuthed)

    if (!isUserAuthed) return <Navigate replace to='/login' />

    return <Component {...props} />
  }

  return ComponentContainer
}

export default withAuthNavigate

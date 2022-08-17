import { useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setAppThemeToLS } from '../../dal/localStorage'
import { selectAppTheme } from '../../redux/ducks/app/selectors'
import { setAppTheme } from '../../redux/ducks/app/operations'

export const useTheme = () => {
  const dispatch = useDispatch()
  const defaultTheme = useSelector(selectAppTheme)

  const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme)

  useLayoutEffect(() => {
    setAppThemeToLS(theme).then(() => {
      dispatch(setAppTheme())
    })
  }, [theme])

  return { theme, setTheme }
}

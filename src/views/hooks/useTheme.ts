import { useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { themeAPI } from '../../dal/localForage'
import { selectAppTheme } from '../../redux/ducks/app/selectors'
import { setAppTheme } from '../../redux/ducks/app/operations'

export const useTheme = () => {
  const dispatch = useDispatch()
  const defaultTheme = useSelector(selectAppTheme)

  const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme)

  useLayoutEffect(() => {
    themeAPI.setAppThemeToLF(theme).then(() => {
      dispatch(setAppTheme())
    })
  }, [theme])

  return { theme, setTheme }
}

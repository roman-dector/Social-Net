import localforage from 'localforage'

export const setAppThemeToLS = async (value: 'light' | 'dark') => {
  return await localforage.setItem('app-theme', value)
}

export const getAppThemeFromLS = async () => {
  return await localforage.getItem<'light' | 'dark'>('app-theme')
}

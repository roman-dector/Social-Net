import localforage from 'localforage'

export const themeAPI = {
  setAppThemeToLF: async (value: 'light' | 'dark') => {
    return await localforage.setItem('app-theme', value)
  },

  getAppThemeFromLF: async () => {
    return await localforage.getItem<'light' | 'dark'>('app-theme')
  },
}

export const musicAPI = {
  saveAudioToLF: async (
    name: string,
    audioFile: File,
    picture: File | null = null
  ) => {
    const musicList = await localforage.getItem<File[]>('musicList')

    if (!musicList) {
      return await localforage.setItem('musicList', [
        { name, audioFile, picture },
      ])
    }

    return await localforage.setItem('musicList', [
      ...musicList,
      { name, audioFile, picture },
    ])
  },

  getAudioFromLF: async () => {
    return await localforage.getItem<{ name: string; audioFile: File }[]>(
      'musicList'
    )
  },
}

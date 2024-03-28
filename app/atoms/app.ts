import { atomWithStorage, createJSONStorage }from 'jotai/utils'

let storage
let defaultTheme = 'false'
if (typeof window !== 'undefined') {
  storage = createJSONStorage(() => window.localStorage)
  defaultTheme = localStorage.getItem('darkMode') || 'false'
}

export const darkModeAtom = atomWithStorage('darkMode', JSON.parse(defaultTheme), storage)

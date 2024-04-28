import { useAtom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { useEffect } from 'react';

let storage: any;
let defaultTheme = 'light';
if (typeof window !== 'undefined') {
	storage = createJSONStorage(() => window.localStorage);
	defaultTheme = localStorage.getItem('darkMode') || 'light';
}

export const darkModeAtom = atomWithStorage<string>(
	'darkMode',
	defaultTheme,
	storage,
);

export const useDarkMode = () => {
	const [darkMode, setDarkMode] = useAtom(darkModeAtom);
	useEffect(() => {
		document.documentElement.className = darkMode;
	}, []);
	const toggleDarkMode = () => {
		const val = darkMode === 'light' ? 'dark' : 'light';
		setDarkMode(val);
		document.documentElement.className = val;
	};
	return { darkMode, toggleDarkMode };
};

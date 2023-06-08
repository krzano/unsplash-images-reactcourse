import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

const getInitialDarkMode = () => {
	const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
	if (localStorage.getItem('darkTheme')) {
		const storedDarkMode = localStorage.getItem('darkTheme') === 'true'
		return storedDarkMode
	}
	return prefersDarkMode
}

export const AppProvider = ({ children }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode())
	const [searchTerm, setSearchTerm] = useState('cat')

	const toggleDarkTheme = () => {
		const newIsDarkTheme = !isDarkTheme
		setIsDarkTheme(newIsDarkTheme)
		localStorage.setItem('darkTheme', newIsDarkTheme)
	}

	useEffect(() => {
		document.body.classList.toggle('dark-theme', isDarkTheme)
	}, [isDarkTheme])

	return (
		<AppContext.Provider
			value={{
				isDarkTheme,
				toggleDarkTheme,
				searchTerm,
				setSearchTerm,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => useContext(AppContext)

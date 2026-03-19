import { useState } from "react"
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme'))||"light")

    const toggleTheme = (newTheme) => {
        setTheme(newTheme)
        let Theme= JSON.stringify(newTheme)
        localStorage.setItem("theme",Theme)
    }
    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
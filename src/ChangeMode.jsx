import LightButton from "./assets/light-mode-button.png"
import DarkButton from "./assets/dark-mode-button.png"
import { useEffect, useState } from "react"
const ChangeMode = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")
    const element = document.documentElement;

    useEffect(() => {
        if (theme === "dark") {
            element.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            element.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme])

    return (
        <div className="absolute top-0 right-0">
            <img src={LightButton} alt="lightmode"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10 ${theme === "dark" ? "opacity-0" : "opacity-100"}`} />
            <img src={DarkButton} alt="darkmode"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300" />
        </div>
    )
}

export default ChangeMode
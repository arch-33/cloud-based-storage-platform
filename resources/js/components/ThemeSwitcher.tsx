import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    if (!mounted) return null

    return (
        <Button className="p-1 border border-gray-700 focus:outline-none active:outline-none dark:border-gray-100" isIconOnly variant="shadow" onClick={toggleTheme} radius={"full"}>
            {theme === "light" ?
                <SunIcon className="w-6 h-6 " /> :
                <MoonIcon className="w-6 h-6" />}
        </Button>

    )
}

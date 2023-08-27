'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { BiSun, BiMoon } from 'react-icons/bi'
import { useLoaded } from '@/hooks/useLoad'

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme()
    const loaded = useLoaded()
    return (
        <button
            onClick={() =>
                theme === 'light' ? setTheme('dark') : setTheme('light')
            }
        >
            {theme === 'light' && loaded ? (
                <BiSun className="text-zinc-950" fontSize={20} />
            ) : (
                <BiMoon className="text-zinc-50" fontSize={20} />
            )}
        </button>
    )
}

export default ThemeSwitcher

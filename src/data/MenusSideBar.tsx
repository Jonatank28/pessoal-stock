import React from 'react'
import { menuSidebarProps } from '@/types/menuSideBar'

const MenusSideBar = () => {
    const data: menuSidebarProps[] = [
        {
            id: 1,
            title: 'Dashboard',
            route: 'dashboard',
        },
        {
            id: 2,
            title: 'Gráficos',
            route: 'graficos',
        },
        {
            id: 3,
            title: 'LP',
            route: 'lp',
        },
    ]
    return data
}

export default MenusSideBar

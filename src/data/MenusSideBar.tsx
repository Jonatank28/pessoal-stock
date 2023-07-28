import React from 'react'
import { MenuSidebarProps } from '@/types/MenuSideBar'

const MenusSideBar = () => {
    const data: MenuSidebarProps[] = [
        {
            id: 1,
            title: 'Dashboard',
            route: 'dashboard',
        },
        {
            id: 2,
            title: 'Cadastros',
            route: 'cadastros',
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

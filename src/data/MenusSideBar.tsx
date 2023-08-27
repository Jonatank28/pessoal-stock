import { menuSidebarProps } from '@/types/MenuSideBar'

const MenusSideBar = () => {
    const data: menuSidebarProps[] = [
        {
            id: 1,
            title: 'Dashboard',
            route: 'dashboard',
        },
        {
            id: 2,
            title: 'Investimentos',
            route: 'investiment',
        },
        {
            id: 3,
            title: 'Gráficos',
            route: 'graficos',
        },
    ]
    return data
}

export default MenusSideBar

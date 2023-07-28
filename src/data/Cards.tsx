import IconArrowDown from '@/icon/IconArrowDown'
import IconArrowUp from '@/icon/IconArrowUp'
import IconBank from '@/icon/IconBank'
import IconPigMoney from '@/icon/IconPigMoney'
import { CardsOptionsProps } from '@/types/cardsOptions'

const Cards = () => {
    const cards: CardsOptionsProps[] = [
        {
            id: 1,
            title: 'Saldo Atual',
            color: 'blue',
            value: 6500,
            icon: <IconBank />,
        },
        {
            id: 2,
            title: 'Receitas',
            color: 'green',
            value: 4000,
            icon: <IconArrowUp />,
        },
        {
            id: 3,
            value: 2000,
            color: 'red',
            title: 'Despesas',
            icon: <IconArrowDown />,
        },
        {
            id: 4,
            value: 12000,
            color: 'tomato',
            title: 'Investimentos',
            icon: <IconPigMoney />,
        },
    ]
    return cards
}

export default Cards

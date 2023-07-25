import IconArrowDown from '@/icon/IconArrowDown'
import IconArrowUp from '@/icon/IconArrowUp'
import IconBank from '@/icon/IconBank'
import { CardsOptionsProps } from '@/types/cardsOptions'

const Cards = () => {
    const cards: CardsOptionsProps[] = [
        {
            id: 1,
            title: 'Saldo Atual',
            value: 6500,
            icon: <IconBank />,
        },
        {
            id: 2,
            title: 'Receitas',
            value: 4000,
            icon: <IconArrowUp />,
        },
        {
            id: 3,
            value: 2000,
            title: 'Despesas',
            icon: <IconArrowDown />,
        },
    ]
    return cards
}

export default Cards

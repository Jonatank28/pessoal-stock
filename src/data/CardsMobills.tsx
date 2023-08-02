import IconArrowDown from '@/icon/IconArrowDown'
import IconArrowUp from '@/icon/IconArrowUp'
import IconBank from '@/icon/IconBank'
import { CardsOptionsProps } from '@/types/cardsOptions'
import useDataInitial from '@/hooks/useDataInitial'

const CardsMobills = () => {
    const { balance } = useDataInitial()

    const cards: CardsOptionsProps[] = [
        {
            id: 1,
            title: 'Saldo Atual',
            color: 'blue',
            value: balance?.currentBalance ?? '0,00',
            icon: <IconBank />,
        },
        {
            id: 2,
            title: 'Receitas',
            color: 'green',
            value: balance?.revenue ?? '0,00',
            icon: <IconArrowUp />,
        },
        {
            id: 3,
            value: balance?.expense ?? '0,00',
            color: 'red',
            title: 'Despesas',
            icon: <IconArrowDown />,
        },
    ]
    return cards
}

export default CardsMobills

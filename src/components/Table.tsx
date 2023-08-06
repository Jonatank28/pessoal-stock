import React from 'react'
import { modalDelete, modalEdit } from '@/app/dashboard/page'
import useDataInitial from '@/hooks/useDataInitial'
import { Transaction } from '@/context/dataInitial'

interface Props {
    setOpenModalEdit: React.Dispatch<React.SetStateAction<modalEdit | null>>
    setOpenModalDelete: React.Dispatch<React.SetStateAction<modalDelete | null>>
}

const Table: React.FC<Props> = ({ setOpenModalEdit, setOpenModalDelete }) => {
    const { balance } = useDataInitial()
    const dataHeader = ['ID', 'Descrição', 'Valor', 'Tipo', 'Tag', 'Ações']

    const editTransaction = (id: number) => {
        setOpenModalEdit({
            status: true,
            id: id,
        })
    }

    const deleteTransaction = (id: number) => {
        setOpenModalDelete({
            status: true,
            id: id,
        })
    }

    // Função para agrupar as transações por day_date
    const groupTransactionsByDate = (transactions: Transaction[]) => {
        const transactionsByDate: { [key: string]: Transaction[] } = {}

        transactions.forEach((transaction) => {
            const { day_date } = transaction
            if (!transactionsByDate[day_date]) {
                transactionsByDate[day_date] = []
            }
            transactionsByDate[day_date].push(transaction)
        })

        return transactionsByDate
    }

    const transactionsByDate = groupTransactionsByDate(
        balance?.transactions || []
    )

    return (
        <div className="w-full py-2">
            <div className="w-full overflow-hidden border border-table rounded-lg shadow-2xl">
                <table className="w-full">
                    <thead className="sticky">
                        <tr className="bg-tableHeader border border-table">
                            {dataHeader.map((row, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 text-left text-primary font-semibold text-gray-800 border border-table"
                                >
                                    {row}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(transactionsByDate).map(
                            ([day_date, transactions], index) => (
                                <React.Fragment key={day_date}>
                                    <tr className="bg-tableZ1">
                                        <td
                                            colSpan={6}
                                            className="border border-table px-6 py-3 bg-primary"
                                        >
                                            {day_date}
                                        </td>
                                    </tr>
                                    {transactions.map(
                                        (transaction, subIndex) => (
                                            <tr
                                                key={`${day_date}_${subIndex}`}
                                                className={`${
                                                    (index + subIndex) % 2 === 0
                                                        ? 'bg-tableZ1'
                                                        : 'bg-tableZ2'
                                                }`}
                                            >
                                                <td className="border border-table px-6 py-3">
                                                    {transaction.transactionID}
                                                </td>
                                                <td className="border border-table px-6 py-3">
                                                    {transaction.description}
                                                </td>
                                                <td
                                                    className={`border border-table px-6 py-3 ${
                                                        transaction.typeID ===
                                                        'Receita'
                                                            ? 'text-green-500/80'
                                                            : transaction.typeID ===
                                                              'Despesa'
                                                            ? 'text-red-500/80'
                                                            : ''
                                                    }`}
                                                >
                                                    R$ {transaction.value}
                                                </td>
                                                <td className="border border-table px-6 py-3">
                                                    {transaction.typeID}
                                                </td>
                                                <td className="border border-table px-6 py-3">
                                                    {transaction.tagID}
                                                </td>
                                                <td className="border border-table px-6 py-3 w-[4%]">
                                                    <span
                                                        className="cursor-pointer mr-2"
                                                        onClick={() =>
                                                            editTransaction(
                                                                transaction.transactionID
                                                            )
                                                        }
                                                    >
                                                        ✏️
                                                    </span>
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            deleteTransaction(
                                                                transaction.transactionID
                                                            )
                                                        }
                                                    >
                                                        ❌
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </React.Fragment>
                            )
                        )}
                    </tbody>
                </table>
                {!balance?.transactions && (
                    <div className="flex justify-center items-center h-[200px]">
                        <p>Não há dados..</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Table

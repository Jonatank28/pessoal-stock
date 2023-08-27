import React from 'react'
import { modalDelete, modalEdit } from '@/app/dashboard/page'
import useDataInitial from '@/hooks/useDataInitial'
import { TransactionsGroup } from '@/context/dataInitial'

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

    const formatValue = (value: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    }

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
                        {/* @ts-ignore */}
                        {balance?.transactionsGroup?.map(
                            (transaction: TransactionsGroup, index: any) => (
                                <React.Fragment key={index}>
                                    <tr className="bg-tableZ1">
                                        <td
                                            colSpan={6}
                                            className="border border-table px-6 py-3 bg-primary"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <span>
                                                        {transaction.day}
                                                    </span>
                                                </div>
                                                <div className="h-[20px] border " />
                                                <div className="text-green-400/60">
                                                    <span>
                                                        Entradas:{' '}
                                                        <span>
                                                            R${' '}
                                                            {formatValue(
                                                                transaction.expense
                                                            )}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="h-[20px] border " />
                                                <div className="text-red-400/60">
                                                    <span>
                                                        Saidas:{' '}
                                                        <span>
                                                            R${' '}
                                                            {formatValue(
                                                                transaction.revenue
                                                            )}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="h-[20px] border " />
                                                <div className="text-blue-400/60">
                                                    <span>
                                                        Total:{' '}
                                                        <span>
                                                            R${' '}
                                                            {formatValue(
                                                                transaction.net_amount
                                                            )}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {transaction?.transactions?.map(
                                        (
                                            transaction,
                                            transactionIndex: any
                                        ) => (
                                            <tr
                                                className={`${
                                                    (index + transactionIndex) %
                                                        2 ===
                                                    0
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
                                                    R${' '}
                                                    {formatValue(
                                                        transaction.value
                                                    )}
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
                {!balance?.transactionsGroup && (
                    <div className="flex justify-center items-center h-[200px]">
                        <p>Não há dados..</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Table

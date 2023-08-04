import useDataInitial from '@/hooks/useDataInitial'

interface Props {
    editTransaction: (id: number) => void
    deleteTransaction: (id: number) => void
}

const Table = ({ editTransaction, deleteTransaction }: Props) => {
    const { balance } = useDataInitial()

    const dataHeader = ['ID', 'Descrição', 'Valor', 'Tipo', 'Tag', 'Ações']

    return (
        <div className="w-full py-2">
            <div className="w-full overflow-hidden border border-table rounded-lg shadow-2xl">
                <table className="w-full">
                    <thead>
                        <tr className="bg-tableHeader border border-table">
                            {dataHeader.map((row) => (
                                <th className="px-6 py-3 text-left text-primary  font-semibold text-gray-800 border border-table">
                                    {row}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {balance?.transactions.map((transaction, index) => (
                            <tr
                                className={`${
                                    index % 2 == 0 ? 'bg-tableZ1' : 'bg-tableZ2'
                                } `}
                            >
                                <td className="border border-table px-6 py-3">
                                    {transaction.transactionID}
                                </td>
                                <td className="border border-table px-6 py-3">
                                    {transaction.description}
                                </td>
                                <td
                                    className={`border border-table px-6 py-3 ${
                                        transaction.typeID == 'Receita'
                                            ? 'text-green-500/80'
                                            : transaction.typeID == 'Despesa'
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
                                    <span className="cursor-pointer mr-2">
                                        ✏️
                                    </span>
                                    <span className="cursor-pointer">❌</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!balance?.transactions && (
                    <div className="flex justify-center items-center h-[200px]">
                        <p>Não a dados..</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Table

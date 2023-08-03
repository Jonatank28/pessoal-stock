const Table = () => {
    return (
        <div className="w-full py-2">
            <div className="w-full overflow-hidden border border-table rounded-lg shadow-2xl">
                <table className="w-full">
                    <thead>
                        <tr className="bg-tableHeader border border-table">
                            <th className="px-6 py-3 text-left text-primary  font-semibold text-gray-800 border border-table">
                                Nome
                            </th>
                            <th className="px-6 py-3 text-left text-primary font-semibold text-gray-800 border border-table">
                                Idade
                            </th>
                            <th className="px-6 py-3 text-left text-primary font-semibold text-gray-800 border border-table">
                                Profissão
                            </th>
                            <th className="px-6 py-3 text-left text-primary font-semibold text-gray-800 w-[6%] border border-table">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-tableZ1">
                            <td className="border border-table px-6 py-3">
                                João
                            </td>
                            <td className="border border-table px-6 py-3">
                                30
                            </td>
                            <td className="border border-table px-6 py-3">
                                Engenheiro
                            </td>
                            <td className="border border-table px-2 py-3">
                                <span
                                    role="img"
                                    aria-label="editar"
                                    className="cursor-pointer mr-2"
                                >
                                    ✏️
                                </span>
                                <span
                                    role="img"
                                    aria-label="deletar"
                                    className="cursor-pointer"
                                >
                                    ❌
                                </span>
                            </td>
                        </tr>
                        <tr className="bg-tableZ2">
                            <td className="border  border-table px-6 py-3">
                                Maria
                            </td>
                            <td className="border  border-table px-6 py-3">
                                25
                            </td>
                            <td className="border  border-table px-6 py-3">
                                Designer
                            </td>
                            <td className="border  border-table px-2 py-3">
                                <span
                                    role="img"
                                    aria-label="editar"
                                    className="cursor-pointer mr-2"
                                >
                                    ✏️
                                </span>
                                <span
                                    role="img"
                                    aria-label="deletar"
                                    className="cursor-pointer"
                                >
                                    ❌
                                </span>
                            </td>
                        </tr>
                        <tr className="bg-tableZ1">
                            <td className="border border-table px-6 py-3">
                                Pedro
                            </td>
                            <td className="border  border-table px-6 py-3">
                                35
                            </td>
                            <td className="border border-table px-6 py-3">
                                Professor
                            </td>
                            <td className="border border-table px-2 py-3">
                                <span
                                    role="img"
                                    aria-label="editar"
                                    className="cursor-pointer mr-2"
                                >
                                    ✏️
                                </span>
                                <span
                                    role="img"
                                    aria-label="deletar"
                                    className="cursor-pointer"
                                >
                                    ❌
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table

'use client'
import Card from '@/components/Card'
import Cards from '@/data/CardsMobills'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import CurrentMonth from '@/components/CurrentMonth'
import UserOptions from '@/components/UserOptions'
import Button from '@/components/Form/Button'
import Table from '@/components/Table'
import NewTransaction from '@/components/transaction/NewTransaction'
import EditTransaction from '@/components/transaction/EditTransaction'
import DeleteTransaction from '@/components/transaction/DeleteTransaction'

export interface modalEdit {
    status: boolean
    id: number
}
export interface modalDelete {
    status: boolean
    id: number
}

const Dashboard = () => {
    const cards = Cards()
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [openModalNew, setOpenModalNew] = useState<boolean>(false)
    const [openModalEdit, setOpenModalEdit] = useState<modalEdit | null>(null)
    const [openModalDelete, setOpenModalDelete] = useState<modalDelete | null>(
        null
    )
    const { user } = useAuth()

    return (
        user && (
            <>
                <main className="p-4 pl-12">
                    <Button
                        title="Novo registro"
                        className="fixed bottom-4 right-4 w-auto primary"
                        type="button"
                        onClick={() => setOpenModalNew(true)}
                    />
                    <div className="flex justify-between">
                        <div></div>
                        <CurrentMonth />
                        <UserOptions
                            menuOpen={menuOpen}
                            setMenuOpen={setMenuOpen}
                        />
                    </div>
                    <div className="pt-6">
                        <h1 className="font-bold text-xl">Dashboard</h1>
                    </div>
                    {/* Cards do header que contem o balanço atual */}
                    <section className="grid grid-cols-3 pt-6 gap-4">
                        {cards.map((card) => (
                            <Card
                                key={card.id}
                                title={card.title}
                                value={card.value}
                                icon={card.icon}
                                color={card.color}
                                id={card.id}
                            />
                        ))}
                    </section>
                    <section>
                        <div className="pt-12 pb-6">
                            <h1 className="font-bold text-xl">
                                Últimos registros
                            </h1>
                        </div>
                    </section>
                    {/* Tabela com os registros de transação*/}
                    <Table
                        setOpenModalEdit={setOpenModalEdit}
                        setOpenModalDelete={setOpenModalDelete}
                    />
                </main>

                {/* Abre modal para registrar nova transação */}
                {openModalNew && (
                    <NewTransaction
                        openModal={openModalNew}
                        setOpenModal={setOpenModalNew}
                    />
                )}
                {/* Abre modal para  editar registro */}
                {openModalEdit?.status && (
                    <EditTransaction
                        openModalEdit={openModalEdit}
                        setOpenModalEdit={setOpenModalEdit}
                    />
                )}
                {/* Abre modal para confirmar se deseja excluir registro */}
                {openModalDelete?.status && (
                    <DeleteTransaction
                        openModalDelete={openModalDelete}
                        setOpenModalDelete={setOpenModalDelete}
                    />
                )}
            </>
        )
    )
}
export default Dashboard

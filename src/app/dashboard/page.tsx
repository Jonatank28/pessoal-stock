'use client'
import Card from '@/components/Card'
import Cards from '@/data/Cards'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import CurrentMonth from '@/components/CurrentMonth'
import UserOptions from '@/components/UserOptions'
import Button from '@/components/Form/Button'
import Modal from '@/components/Modal'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from '@/components/Form/Input'
import Select from '@/components/Form/Select'
import { tipeRegister } from '@/data/typeRegister'
import { tagRegister } from '@/data/tagRegister'
import { formatValue } from '@/services/format'

const Dashboard = () => {
    const cards = Cards()
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const { user, setToast } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // @ts-ignore
        const value = data.value
        const formatData = {
            ...data,
            value: formatValue(value),
        }
        console.log('🚀 ~ formatData:', formatData)
    }

    return (
        user && (
            <>
                <main className="p-4 pl-12 lp w-full h-full">
                    <Button
                        title="Novo registro"
                        className="fixed bottom-4 right-4 w-auto primary"
                        type="button"
                        onClick={() => setOpenModal(true)}
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
                    <section className="grid grid-cols-4 pt-6 gap-4">
                        {cards.map((card, index) => (
                            <Card
                                key={card.id}
                                title={card.title}
                                value={card.value}
                                icon={card.icon}
                                color={card.color}
                            />
                        ))}
                    </section>
                </main>
                {/* Modal ao clicar no botão Novo */}
                <Modal isOpen={openModal} title="Novo registro">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2">
                            <Input
                                errors={errors}
                                register={register}
                                mask="money"
                                name="value"
                                label="Valor"
                                maxLength={14}
                            />
                            <Input
                                errors={errors}
                                register={register}
                                type="string"
                                name="description"
                                label="Descrição"
                            />
                            <Select
                                errors={errors}
                                register={register}
                                name="typeID"
                                label="Tipo"
                                options={tipeRegister}
                            />
                            <Select
                                errors={errors}
                                register={register}
                                name="tagID"
                                label="Tag"
                                options={tagRegister}
                            />
                        </div>
                        <div className="flex items-center gap-4 mt-6">
                            <Button
                                className="w-full error"
                                title="Cancelar"
                                type="button"
                                onClick={() => setOpenModal(false)}
                            />
                            <Button
                                className="w-full success"
                                title="Salvar"
                                type="submit"
                            />
                        </div>
                    </form>
                </Modal>
            </>
        )
    )
}
export default Dashboard

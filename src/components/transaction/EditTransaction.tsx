import { useForm, SubmitHandler } from 'react-hook-form'
import Button from '../Form/Button'
import Select from '../Form/Select'
import Input from '../Form/Input'
import Modal from '../Modal'
import { formatValue } from '@/services/format'
import { api } from '@/services/api'
import useAuth from '@/hooks/useAuth'
import useDataInitial from '@/hooks/useDataInitial'
import { modalEdit } from '@/app/dashboard/page'
import { useEffect } from 'react'

interface Props {
    openModalEdit: modalEdit | any
    setOpenModalEdit: React.Dispatch<React.SetStateAction<modalEdit | null>>
}

const EditTransaction = ({ openModalEdit, setOpenModalEdit }: Props) => {
    const { user, setToast } = useAuth()
    const { getDataInitial, balance } = useDataInitial()
    const id = openModalEdit?.id

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    // Formata para a moeda pt-br
    const applyMaskMoney = (value: string) => {
        value = value.replace(/\D/g, '')
        value = (Number(value) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
        return value
    }

    const getData = async () => {
        try {
            const response = await api.get(`transaction/getData/${id}`)
            const valueFormat = response.data.value.toString()
            const formatData = {
                ...response.data,
                value: applyMaskMoney(valueFormat),
            }
            reset(formatData)
        } catch (error) {
            console.log(error)
        }
    }

    //! Edita a transação
    const onSubmit: SubmitHandler<FormData> = async (values) => {
        const formatData = {
            ...values,
            userID: user?.userID,
            // @ts-ignore
            value: formatValue(values.value),
        }
        const data = formatData
        const response = await api.put(`transaction/update`, data)
        if (response.status == 201) {
            setToast({
                status: true,
                message: response.data.message,
            })
            getDataInitial()
            setOpenModalEdit(null)
            reset()
            setTimeout(() => {
                setToast(null)
            }, 2000)
        }
        try {
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Modal
            isOpen={openModalEdit?.status}
            title={`Editar registro ${openModalEdit?.id}`}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                    <Input
                        errors={errors}
                        register={register}
                        required
                        mask="money"
                        name="value"
                        label="Valor"
                        maxLength={14}
                    />
                    <Input
                        errors={errors}
                        register={register}
                        required
                        type="string"
                        name="description"
                        label="Descrição"
                    />
                    <Select
                        errors={errors}
                        register={register}
                        required
                        name="typeID"
                        label="Tipo"
                        options={balance?.types}
                    />
                    <Select
                        errors={errors}
                        register={register}
                        required
                        name="tagID"
                        label="Tag"
                        options={balance?.tags}
                    />
                </div>
                <div className="flex items-center gap-4 mt-6">
                    <Button
                        className="w-full error"
                        title="Cancelar"
                        type="button"
                        onClick={() => {
                            setOpenModalEdit(null)
                            reset()
                        }}
                    />
                    <Button
                        className="w-full success"
                        title="Salvar"
                        type="submit"
                    />
                </div>
            </form>
        </Modal>
    )
}

export default EditTransaction

import { useForm, SubmitHandler } from 'react-hook-form'
import Button from '../Form/Button'
import Select from '../Form/Select'
import Input from '../Form/Input'
import Modal from '../Modal'
import { formatValue } from '@/services/format'
import { api } from '@/services/api'
import useAuth from '@/hooks/useAuth'
import useDataInitial from '@/hooks/useDataInitial'
import DateInput from '../Form/Date'

interface Props {
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const NewTransaction = ({ setOpenModal, openModal }: Props) => {
    const { user, setToast } = useAuth()
    const { getDataInitial, balance } = useDataInitial()

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    //! Cadastra nova transação
    const onSubmit: SubmitHandler<FormData> = async (values) => {
        // @ts-ignore
        const value = formatValue(values.value)
        const data = {
            ...values,
            value: value,
            userID: user?.userID,
        }
        try {
            const response = await api.post('transaction/new', data)
            if (response.status == 201) {
                setToast({
                    status: true,
                    message: response.data.message,
                })
                getDataInitial()
                setOpenModal(false)
                reset()
                setTimeout(() => {
                    setToast(null)
                }, 2000)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Modal isOpen={openModal} title="Novo registro">
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
                    <DateInput
                        errors={errors}
                        register={register}
                        name="updateDate"
                        required
                        label="Data:"
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
                            setOpenModal(false)
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

export default NewTransaction

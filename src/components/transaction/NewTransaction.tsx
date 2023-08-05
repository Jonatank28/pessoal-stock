import { Input } from 'postcss'
import { useForm, SubmitHandler } from 'react-hook-form'
import Button from '../Form/Button'
import Select from '../Form/Select'
import Modal from '../Modal'

const NewTransaction = () => {
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

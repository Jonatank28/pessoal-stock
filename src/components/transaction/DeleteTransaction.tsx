import { modalDelete } from '@/app/dashboard/page'
import Button from '../Form/Button'
import Modal from '../Modal'
import { api } from '@/services/api'
import useAuth from '@/hooks/useAuth'
import useDataInitial from '@/hooks/useDataInitial'

interface Props {
    openModalDelete: modalDelete | any
    setOpenModalDelete: React.Dispatch<React.SetStateAction<modalDelete | null>>
}

const DeleteTransaction = ({ openModalDelete, setOpenModalDelete }: Props) => {
    const { setToast } = useAuth()
    const { getDataInitial } = useDataInitial()

    //! Exclui uma trasansação de forma permanente
    const handleTransactionDelete = async () => {
        try {
            const id = openModalDelete.id
            const response = await api.delete(`transaction/delete/${id}`)
            if (response.status == 201) {
                setToast({
                    status: true,
                    message: response.data.message,
                })
                getDataInitial()
                setOpenModalDelete(null)
                setTimeout(() => {
                    setToast(null)
                }, 2000)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Modal
            isOpen={openModalDelete?.status}
            title={`Deletar registro ${openModalDelete?.id}`}
        >
            <div className="flex items-center gap-4 mt-6">
                <Button
                    className="w-full error"
                    title="Cancelar"
                    type="button"
                    onClick={() => setOpenModalDelete(null)}
                />
                <Button
                    className="w-full success"
                    title="Salvar"
                    type="button"
                    onClick={handleTransactionDelete}
                />
            </div>
        </Modal>
    )
}

export default DeleteTransaction

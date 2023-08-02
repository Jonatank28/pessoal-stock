import { useContext } from 'react'
import {
    dataInitialContext,
    DataInitialContextType,
} from '@/context/dataInitial'

const useDataInitial = (): DataInitialContextType => {
    return useContext(dataInitialContext)
}

export default useDataInitial

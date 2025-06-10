import { useEffect, useState } from "react"
import { createClient } from "../../supabase/client"
import { IInfo } from '../types/information';


export const useFetchInfo = () => {
    const [isInfoData, setIsInfoData] = useState<IInfo[]>([])
    useEffect(() => {
        const fetchInfo = async() => {
            const supabase = await createClient()
        const {data: infoData, error: infoError} = await supabase.from('information').select("*")
        if (infoError) {
            console.log(infoError)
        } if (infoData) {
            setIsInfoData(infoData as IInfo[])
        } else setIsInfoData([])
        }  
        fetchInfo()
    }, [])

    return {
        isInfoData
    }
}
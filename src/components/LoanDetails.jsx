import { useEffect, useState } from "react"
import { getLoanById } from "../service/LoanService"

export const LoanDetails = ({ id }) => {
    const [loanState, setLoansState] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setLoansState(getLoanById(id))
        setIsLoading(false)
    }, [])

    return (
        isLoading
            ?
            'Loading'
            :
            !loanState
                ?
                <h1>
                    No existe
                </h1>
                :
                <h1>
                    {loanState?.client}
                </h1>
    )
}

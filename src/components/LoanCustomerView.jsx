import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { getLoanById } from "../service/LoanService"
import { LoanDetails } from "./LoanDetails"
import { LoanProgress } from "./LoanProgress"
import { LoanPaymentScheduleTable } from "./LoanPaymentScheduleTable"

export const LoanCustomerView = ({ id }) => {
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
                <Container>
                    <LoanDetails loan={loanState} />
                    {loanState.installments > 0 && <LoanProgress loan={loanState} />}
                    <LoanPaymentScheduleTable loan={loanState} />
                </Container>
    )
}


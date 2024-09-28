import { useEffect, useState } from "react"
import { getLoanById } from "../service/LoanService"
import { LoanInfo } from "./LoanInfo"
import { Container } from "react-bootstrap"
import { LoanProgress } from "./LoanProgress"
import { LoanPaymentSchedule } from "./LoanPaymentSchedule"

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
                <Container>
                    <LoanInfo loan={loanState} />
                    {loanState.installments > 0 && <LoanProgress loan={loanState} />}
                    <LoanPaymentSchedule loan={loanState} />
                </Container>
    )
}

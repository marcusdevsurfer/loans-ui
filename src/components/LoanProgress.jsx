import { useEffect, useState } from "react"
import ProgressBar from "react-bootstrap/ProgressBar"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"
import Container from "react-bootstrap/Container"
import { fetchLoanById } from "../service/LoanService"
import '../App.css'
import './css/LoanDetails.css'

export const LoanProgress = ({ loanId }) => {
    const [loanState, setLoanState] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [progressPorcent, setProgressPorcent] = useState(30)

    useEffect(() => {
        fetchLoanById(loanId)
            .then((data) => setLoanState(data))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false))
    }, [loanId])

    const calculateInterest = () => {
        if (loanState) {
            const interest = loanState.amount * (loanState.interestRate / 100)
            return interest
        }
    }

    const calculateTotal = () => {
        if (loanState) {
            const total = loanState.amount + calculateInterest()
            return total
        }
    }
    return (
        <Container className="loan-details-card">
            <h1 className="font-title mb-4">Progreso del prestamo</h1>
            {
                isLoading
                    ?
                    <Spinner className='ms-auto' variant='dark' />
                    :
                    <>
                        <ProgressBar variant="dark" now={progressPorcent} />
                        <Row>
                            <Col>
                                <p className="text-start font-subtitle p-1">Total pagado: ${calculateInterest()}</p>
                            </Col>
                            <Col>
                                <p className="text-end font-subtitle p-1">Restante: -${calculateTotal() - calculateInterest()}</p>
                            </Col>
                        </Row>
                    </>
            }
        </Container>
    )
}

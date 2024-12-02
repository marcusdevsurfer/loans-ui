import { useEffect, useState } from "react"
import ProgressBar from "react-bootstrap/ProgressBar"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"
import Container from "react-bootstrap/Container"
import { fetchPayments } from '../service/PaymentsService'
import '../App.css'
import './css/LoanDetails.css'

export const LoanProgress = ({ loanId }) => {
    const [payments, setPayments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalPaid, setTotalPaid] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const payments = await fetchPayments()
            const paymentsByLoanId = payments.filter((payment) => payment.loan == loanId)
            setPayments(paymentsByLoanId)
            const totalPaid = paymentsByLoanId.reduce((acc, payment) => acc + payment.amount, 0)
            setTotalPaid(totalPaid)
            setIsLoading(false)
        }
        fetchData()
    }, [loanId])

    return (
        <Container className="loan-details-card">
            <h1 className="font-title mb-4">Progreso del prestamo</h1>
            {
                isLoading
                    ?
                    <Spinner className='ms-auto' variant='dark' />
                    :
                    <>
                        <ProgressBar variant="dark" now={0} />
                        <Row>
                            <Col>
                                <p className="text-start font-subtitle p-1">Total pagado: ${totalPaid}</p>
                            </Col>
                            <Col>
                                <p className="text-end font-subtitle p-1">Restante: -$</p>
                            </Col>
                        </Row>
                    </>
            }
        </Container>
    )
}

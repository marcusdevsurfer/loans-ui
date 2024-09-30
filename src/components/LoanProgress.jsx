import { useEffect, useState } from "react"
import ProgressBar from "react-bootstrap/ProgressBar"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { getPaymentsByLoanId } from "../service/PaymentsService"
import '../App.css'
import './css/LoanDetails.css'


export const LoanProgress = ({ loan }) => {
    const [paymentsState, setPaymentsState] = useState([])
    const progressPorcent = (paymentsState.length * 100) / loan.installments
    const paidAmount = paymentsState.map((payment => payment.amount)).reduce((pv, cv) => pv + cv, 0)
    useEffect(() => {
        setPaymentsState(getPaymentsByLoanId(loan.id))
    }, [])
    return (
        <div className="loan-details-card">
            <h1 className="font-title mb-4">Progreso del prestamo</h1>
            <ProgressBar variant="dark" now={progressPorcent} label={`${progressPorcent}%`} />
            <Row>
                <Col>
                    <p className="text-start font-subtitle p-1">Total pagado: ${paidAmount.toLocaleString()}</p>
                </Col>
                <Col>
                    <p className="text-end font-subtitle p-1">Restante: -${(loan.amount - paidAmount).toLocaleString()}</p>
                </Col>
            </Row>
        </div>
    )
}

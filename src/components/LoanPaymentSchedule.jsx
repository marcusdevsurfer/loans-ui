import '../App.css'
import './css/LoanDetails.css'
import Table from "react-bootstrap/Table"
import { getPaymentsByLoanId } from "../service/PaymentsService"
import { useEffect, useState } from 'react'

export const LoanPaymentSchedule = ({ loan }) => {
    const [paymentsState, setPaymentsState] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setPaymentsState(getPaymentsByLoanId(loan.id))
        setIsLoading(false)
    }, [])
    return (
        <div className='loan-details-card'>
            <h1 className="font-title mb-4">Calendario de pagos</h1>
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>Pago</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paymentsState.map((payment, i) => (
                            <tr>
                                <td>{i + 1}</td>
                                <td>{payment?.date.toLocaleDateString()}</td>
                                <td>{payment?.amount.toLocaleString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

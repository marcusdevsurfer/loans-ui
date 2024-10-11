import '../App.css'
import './css/LoanDetails.css'
import Table from "react-bootstrap/Table"
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useEffect, useState } from 'react'
import { RegisterPaymentModal } from './RegisterPaymentModal';

export const LoanPaymentSchedule = ({ loan }) => {
    const { id } = loan
    const API_URL_BASE = import.meta.env.VITE_API_URL;
    const API_URL_COMPLEMENT = `/api/loan/${parseInt(id)}/payments`
    const API_URL = `${API_URL_BASE}${API_URL_COMPLEMENT}`

    const [paymentsState, setPaymentsState] = useState([])
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        fetchAllPaymentsByLoanId(id)
    }, [])

    const fetchAllPaymentsByLoanId = async (id) => {
        const REQUEST_OPTIONS = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        try {
            const response = await fetch(API_URL, REQUEST_OPTIONS)
            const data = await response.json()
            setPaymentsState(data.payments)
        } catch {
            (e) => console.log(e)
        }
    }

    return (
        <div className='loan-details-card'>
            <Stack direction='horizontal' className='mb-4'>
                <h1 className="font-title m-0">Calendario de pagos</h1>
                <Button size='sm' variant="dark" className='ms-auto' onClick={() => setModalShow(true)}>
                    Nuevo
                </Button>
            </Stack>
            <RegisterPaymentModal loanId={id} onHide={() => setModalShow(false)} show={modalShow} setModalShow={setModalShow} fetchData={fetchAllPaymentsByLoanId} />
            {paymentsState.length > 0 &&
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>Pago</th>
                            <th>Fecha</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentsState.map((payment, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{payment?.date}</td>
                                <td>{`$${payment?.amount.toLocaleString()}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </div>
    )
}

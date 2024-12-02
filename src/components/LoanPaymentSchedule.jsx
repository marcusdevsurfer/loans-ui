import '../App.css'
import './css/LoanDetails.css'
import Table from "react-bootstrap/Table"
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import { RegisterPaymentModal } from './RegisterPaymentModal';
import { fetchPaymentsByLoan } from '../service/PaymentsService';

export const LoanPaymentSchedule = ({ loanId }) => {
    const [paymentsState, setPaymentsState] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const payments = await fetchPaymentsByLoan(loanId)
            setPaymentsState(payments)
            setIsLoading(false)
        }
        fetchData()
    }, [loanId])

    return (
        <div className='loan-details-card'>
            <Stack className='mb-4' direction='horizontal' gap={1}>
                <h1 className="font-title m-0">Calendario de pagos</h1>
                <Button disabled={isLoading} size='sm' variant="dark" className='ms-auto' onClick={() => setModalShow(true)}>
                    Nuevo
                </Button>
            </Stack>
            <RegisterPaymentModal onHide={() => setModalShow(false)} show={modalShow} setModalShow={setModalShow} />
            {
                !isLoading ?
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
                                    <td>{new Date(payment?.date).toLocaleDateString()}</td>
                                    <td>{`$${payment?.amount.toLocaleString()}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    :
                    <p className='text-muted text-center'>Cargando pagos, por favor espera.</p>
            }
        </div>
    )
}

LoanPaymentSchedule.propTypes = {
    loanId: PropTypes.string.isRequired
}   

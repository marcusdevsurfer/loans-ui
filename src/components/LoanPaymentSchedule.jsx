import '../App.css'
import './css/LoanDetails.css'
import Table from "react-bootstrap/Table"
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useEffect, useState } from 'react'
import { RegisterPaymentModal } from './RegisterPaymentModal';

export const LoanPaymentSchedule = ({ loan }) => {
    const { id } = loan
    const [paymentsState, setPaymentsState] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        fetchAllPaymentsByLoanId(id)
    }, [])

    const fetchAllPaymentsByLoanId = (id) => {
        fetch(`http://127.0.0.1:3000/api/loans/${id}/payments`)
            .then((response) => response.json())
            .then(data => {
                setPaymentsState(data)
                setIsLoading(false)
            })
            .catch((e) => console.log(e))
    }

    return (
        <div className='loan-details-card'>
            <Stack direction='horizontal'>
                <h1 className="font-title m-0">Calendario de pagos</h1>
                <Button size='sm' variant="dark" className='ms-auto' onClick={() => setModalShow(true)}>
                    Nuevo
                </Button>
            </Stack>
            <RegisterPaymentModal show={modalShow} onHide={() => setModalShow(false)} />
            {
                !isLoading && paymentsState.length > 0 &&
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
                            <tr>
                                <td>{i + 1}</td>
                                <td>{payment?.date.toLocaleDateString()}</td>
                                <td>{`$${payment?.amount.toLocaleString()}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </div>
    )
}

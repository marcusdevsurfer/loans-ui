import '../App.css'
import './css/LoanDetails.css'
import Table from "react-bootstrap/Table"
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useEffect, useState } from 'react'
import { RegisterPaymentModal } from './RegisterPaymentModal';
import { useParams } from 'wouter';

export const LoanPaymentSchedule = ({ loan }) => {
    const { id } = useParams()
    const [paymentsState, setPaymentsState] = useState([])
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        fetchAllPaymentsByLoanId(id)
    }, [])

    const fetchAllPaymentsByLoanId = async (id) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch(`http://127.0.0.1:3000/api/loans/${parseInt(id)}/payments`, {
            method: "GET",
            headers: myHeaders
        })
        if (response.ok) {
            const data = await response.json()
            setPaymentsState(data)
        }
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
                            <tr>
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

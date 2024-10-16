import '../App.css'
import './css/LoanDetails.css'
import Table from "react-bootstrap/Table"
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Spinner from "react-bootstrap/Spinner"
import { useEffect, useState } from 'react'
import { RegisterPaymentModal } from './RegisterPaymentModal';
import { useParams } from 'wouter';

export const LoanPaymentSchedule = ({ loan }) => {
    const { id } = useParams()

    const API_URL_BASE = import.meta.env.VITE_API_URL;
    const API_URL_COMPLEMENT = `/api/payments/${id}`
    const API_URL = `${API_URL_BASE}${API_URL_COMPLEMENT}`

    const [paymentsState, setPaymentsState] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchAllPaymentsByLoanId(id)
    }, [id])

    const fetchAllPaymentsByLoanId = async (id) => {
        const REQUEST_OPTIONS = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        try {
            const response = await fetch(API_URL, REQUEST_OPTIONS)
            const data = await response.json()
            setPaymentsState(data)
            setIsLoading(false)
        } catch {
            (e) => console.log(e)
        }
    }

    return (
        <div className='loan-details-card'>
            <Stack className='mb-4' direction='horizontal' gap={1}>
                <h1 className="font-title m-0">Calendario de pagos</h1>
                {
                    isLoading &&
                    <Spinner className='ms-auto' variant='dark' />
                }
                {
                    !isLoading &&
                    <Button size='sm' variant="dark" className='ms-auto' onClick={() => setModalShow(true)}>
                        Nuevo
                    </Button>
                }
            </Stack>
            <RegisterPaymentModal onHide={() => setModalShow(false)} show={modalShow} setModalShow={setModalShow} fetchData={fetchAllPaymentsByLoanId} />
            {isLoading &&
                <>
                    <p className='text-muted text-center'>Cargando pagos, por favor espera.</p>
                </>
            }
            {!isLoading &&
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

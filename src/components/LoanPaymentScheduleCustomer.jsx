import { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table"
import Spinner from "react-bootstrap/Spinner"
import Stack from "react-bootstrap/Stack"
import '../App.css'
import './css/LoanDetails.css'
import { useParams } from 'wouter'
import { fetchPaymentsByLoan } from '../service/PaymentsService'

export const LoanPaymentScheduleCustomer = () => {

    const { id } = useParams()
    const [paymentsState, setPaymentsState] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData(id);
    }, [id])


    const fetchData = async (id) => {
        try {
            const response = await fetchPaymentsByLoan(id)
            const data = await response.json()
            setPaymentsState(data)
            setIsLoading(false)
        } catch {
            (e) => console.log(e)
        }
    }

    return (
        <div className='loan-details-card'>
            <Stack direction='horizontal' gap={1}>
                <h1 className="font-title m-0">Calendario de pagos</h1>
            </Stack>
            {
                isLoading ?
                    <div className='text-center mt-3'>
                        <Spinner variant='dark' animation="border" role="status" />
                        <p className='text-muted'>Cargando pagos, por favor espera.</p>
                    </div>
                    :
                    paymentsState.length > 0 ?
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
                        <p className='text-muted text-center'>No hay pagos registrados.</p>
            }
        </div>
    )
}


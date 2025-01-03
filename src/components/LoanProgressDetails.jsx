import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import '../App.css'

import { fetchPaymentsByLoan } from '../service/PaymentsService'

export const LoanProgressDetails = ({ loanId }) => {
    const [payments, setPayments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData(loanId)
    }, [loanId])

    const fetchData = async (id) => {
        try {
            const response = await fetchPaymentsByLoan(id)
            const data = await response.json()
            setPayments(data)
            setIsLoading(false)
        } catch {
            (e) => console.error(e)
        }
    }

    return (
        <Container className='card'>
            <h1 className='font-title mb-3'>Progreso</h1>
            <Row>
                {
                    isLoading
                        ?
                        <Col className='text-center'>
                            <Spinner variant='dark' animation="border" role="status" />
                            <p className='text-muted'>Cargando detalles, por favor espera.</p>
                        </Col>
                        :
                        payments.length > 0
                            ?
                            <>
                                <Col>
                                    <p>
                                        Pagos realizados
                                    </p>
                                    <p className='font-title'>10</p>
                                </Col>
                            </>
                            :
                            <Col className='text-center'>
                                No hay pagos realizados
                            </Col>
                }
            </Row>
        </Container >
    )
}

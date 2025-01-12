import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Badge from 'react-bootstrap/Badge'
import '../App.css'

import { fetchPaymentsByLoan } from '../service/PaymentsService'
import { fetchLoanById } from '../service/LoanService'

export const LoanProgressDetails = ({ loanId }) => {
    const [loanStatus, setLoanStatus] = useState('')
    const [payments, setPayments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData(loanId)
    }, [loanId])

    const fetchData = async (id) => {
        try {
            const response = await fetchPaymentsByLoan(id)
            const data = await response.json()
            const { status } = await fetchLoanById(id)
            setLoanStatus(status)
            setPayments(data)
            setIsLoading(false)
        } catch {
            (e) => console.error(e)
        }
    }

    const showBadgeStatus = (status) => {
        switch (status) {
            case 'pending':
                return (<Badge bg='warning' text='dark'>En progreso</Badge>)
            case 'approved':
                return (<Badge bg='success'>Aprobado</Badge>)
            case 'rejected':
                return <Badge bg='danger'>Rechazado</Badge>
            case 'paid':
                return <Badge bg='success'>Pagado</Badge>
            default:
                return <Badge variant='secondary'>{status}</Badge>
        }
    }

    return (
        <Container className='card'>
            <Row className='mb-2'>
                <Col>
                    <h1 className='font-title'>Progreso</h1></Col>
                <Col className='text-end'>
                    {showBadgeStatus(loanStatus)}
                </Col>
            </Row>
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
                            <Col>
                                <p>
                                    Pagos realizados
                                </p>
                                <p className='font-title'>{payments.length}</p>
                            </Col>
                            :
                            <Col className='text-center'>
                                <p className='text-muted'>No hay pagos registrados</p>
                            </Col>
                }
            </Row>
        </Container >
    )
}

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { fetchLoanById } from '../service/LoanService'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import '../App.css'
import './css/LoanDetails.css'

export const LoanDetails = ({ loanId }) => {
    const [loanState, setLoanState] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => { 
            const loan = await fetchLoanById(loanId)
            setLoanState(loan)
            setIsLoading(false)
        }
        fetchData()
    }, [loanId])

    const calculateTotalPayment = (amount, interestRate) => {
        return amount + (amount * (interestRate / 100))
    }

    const formatNumber = (number) => {
        return number.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    if (isLoading) {
        return <Spinner className='ms-auto' variant='dark' />
    }

    return (
        <Container className='loan-details-card'>
            <h1 className='font-title mb-4'>Detalles de Prestamo</h1>
            {
                loanState &&
                <Row className='align-items-center' >
                    <Col>
                        <h5 className='font-subtitle'>Cliente</h5>
                        <p className='font-text'>{loanState?.borrower}</p>
                    </Col>
                    <Col>
                        <h5 className='font-subtitle'>Monto de prestamo</h5>
                        <p className='font-text'>${formatNumber(loanState?.amount)}</p>
                    </Col>
                    <Col>
                        <h5 className='font-subtitle'>Interes</h5>
                        <p className='font-text'>{loanState?.interestRate}%</p>
                    </Col>
                    <Col>
                        <h5 className='font-subtitle'>Pago total</h5>
                        <p className='font-text'>${formatNumber(calculateTotalPayment(loanState?.amount, loanState?.interestRate))}</p>
                    </Col>
                </Row>
            }
        </Container>
    )
}

LoanDetails.propTypes = {
    loanId: PropTypes.string.isRequired,
}

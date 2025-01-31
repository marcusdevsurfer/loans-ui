import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { fetchLoanById } from '../service/LoanService'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import '../App.css'
import './css/LoanDetails.css'

export const LoanDetails = ({ loanId }) => {
    const [loanState, setLoanState] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [loanId])

    const fetchData = async () => {
        try {
            const data = await fetchLoanById(loanId)
            setLoanState(data)
            setIsLoading(false)
        }
        catch (error) {
            console.error('Error:', error)
        }
    }

    const formatNumber = (number) => {
        return number?.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <div className='loan-details-card'>
            <h1 className='font-title mb-4'>Detalles de Prestamo</h1>
            {
                isLoading
                    ?
                    <div className='text-center mt-3'>
                        <Spinner variant='dark' animation="border" role="status" />
                        <p className='text-muted'>Cargando detalles del prestamo, por favor espera.</p>
                    </div>

                    :
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
                    </Row>
            }
        </div>
    )
}

LoanDetails.propTypes = {
    loanId: PropTypes.string.isRequired,
}

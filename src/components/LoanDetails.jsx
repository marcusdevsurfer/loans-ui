import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css'
import './css/LoanDetails.css'

export const LoanDetails = ({ loan }) => {
    const { amount, interest, installments } = loan
    const interestTotal = (amount * interest) / 100
    const loanTotalAmount = (interestTotal + amount)
    const installmentAmount = (loanTotalAmount / installments)
    return (
        <div className='loan-details-card'>
            <h1 className='font-title mb-4'>Detalles de Prestamo</h1>
            <Row direction='horizontal'>
                <Col>
                    <h5 className='font-subtitle'>Cliente</h5>
                    <p className='font-text'>{loan?.client}</p>
                </Col>
                <Col>
                    <h5 className='font-subtitle'>Monto de prestamo</h5>
                    <p className='font-text'>${amount.toLocaleString()}</p>
                </Col>
                <Col>
                    <h5 className='font-subtitle'>Pago total</h5>
                    <p className='font-text'>${loanTotalAmount.toLocaleString()}</p>
                </Col>
            </Row>
            <Row direction='horizontal'>
                {
                    installments &&
                    <Col>
                        <h5 className='font-subtitle'>Cuotas</h5>
                        <p className='font-text'>{installments}</p>
                    </Col>
                }
                {
                    interest > 0 && installments &&
                    <Col>
                        <h5 className='font-subtitle'>Monto de cuota</h5>
                        {!loan.installments && <p className='font-text'>{`$${interestTotal.toLocaleString()}`}</p>}
                        {loan.installments && <p className='font-text'>{`$${installmentAmount.toLocaleString()}`}</p>}
                    </Col>
                }
                <Col>
                </Col>
            </Row>
        </div>
    )
}

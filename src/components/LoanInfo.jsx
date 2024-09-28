import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css'
import './css/LoanDetails.css'

export const LoanInfo = ({ loan }) => {
    const interestAmount = (loan.amount * loan.interest) / 100
    const installmentAmount = loan.amount / loan.installments
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
                    <p className='font-text'>${loan?.amount.toLocaleString()}</p>
                </Col>
            </Row>
            <Row direction='horizontal'>
                {
                    loan.installments &&
                    <Col>
                        <h5 className='font-subtitle'>Cuotas</h5>
                        <p className='font-text'>{loan?.installments}</p>
                    </Col>
                }

                {
                    loan.interest > 0 &&
                    <Col>
                        <h5 className='font-subtitle'>Monto de cuota</h5>
                        {!loan.installments && <p className='font-text'>{`$${interestAmount.toLocaleString()}`}</p>}
                        {loan.installments && <p className='font-text'>{`$${installmentAmount.toLocaleString()}`}</p>}
                    </Col>
                }

            </Row>
        </div>
    )
}

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css'
import './css/LoanDetails.css'

export const LoanInfo = ({ loan }) => {
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
                    <p className='font-text'>${loan?.amount}</p>
                </Col>
            </Row>
            <Row direction='horizontal'>
                <Col>
                    <h5 className='font-subtitle'>Cuotas</h5>
                    <p className='font-text'>20</p>
                </Col>
                <Col>
                    <h5 className='font-subtitle'>Monto de cuota</h5>
                    <p className='font-text'>$3000</p>
                </Col>
            </Row>
        </div>
    )
}

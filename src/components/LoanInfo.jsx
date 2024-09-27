import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css'

export const LoanInfo = ({ loan }) => {
    return (
        <div>
            <h1 className='font-title my-4'>{loan?.client}</h1>
            <Row direction='horizontal'>
                <Col className=''>
                    <h5 className='font-subtitle'>Cliente</h5>
                    <p className='font-text'>{loan?.client}</p>
                </Col>
                <Col>
                    <h5 className='font-subtitle'>Monto de prestamo</h5>
                    <p className='font-text'>${loan?.amount}</p>
                </Col>
            </Row>
        </div>
    )
}

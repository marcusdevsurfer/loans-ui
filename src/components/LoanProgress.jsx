import ProgressBar from "react-bootstrap/ProgressBar"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import '../App.css'
import './css/LoanDetails.css'

export const LoanProgress = () => {
    return (
        <div className="loan-details-card">
            <h1 className="font-title mb-4">Progreso del prestamo</h1>
            <ProgressBar variant="dark" now={50} />
            <Row>
                <Col>
                    <p className="text-start font-subtitle p-1">Total pagado: $1000</p>
                </Col>
                <Col>
                    <p className="text-end font-subtitle p-1">Restante: $2000</p>
                </Col>
            </Row>
        </div>
    )
}

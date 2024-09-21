import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import './css/DashboardCard.css'

export const DashboardCard = ({ text, data, icon, dollarSign = false }) => {
    return (
        <Col xs='12' md='3' lg='3'>
            <Card className='m-1 p-1'>
                <Card.Header className='d-flex justify-content-between align-items-center bg-white border-0 '>
                    <Card.Text className='card-title m-0'>{`${text}`}</Card.Text>
                    {icon}
                </Card.Header>
                <Card.Body className='d-flex'>
                    <Card.Text className='card-data'>{dollarSign ? `$${data.toLocaleString('en')}` : `${data}`}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}


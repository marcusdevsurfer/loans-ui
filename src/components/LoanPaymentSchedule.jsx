import '../App.css'
import './css/LoanDetails.css'
import Table from "react-bootstrap/Table"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form'

import { useEffect, useState } from 'react'


export const LoanPaymentSchedule = ({ loan }) => {
    const { id } = loan
    const [paymentsState, setPaymentsState] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        fetchAllPaymentsByLoanId(id)
    }, [])

    const fetchAllPaymentsByLoanId = (id) => {
        fetch(`http://127.0.0.1:3000/api/loans/${id}/payments`)
            .then((response) => response.json())
            .then(data => {
                setPaymentsState(data)
                setIsLoading(false)
            })
            .catch((e) => console.log(e))
    }

    return (
        <div className='loan-details-card'>
            <Stack direction='horizontal'>
                <h1 className="font-title m-0">Calendario de pagos</h1>
                <Button size='sm' variant="dark" className='ms-auto' onClick={() => setModalShow(true)}>
                    Nuevo
                </Button>
            </Stack>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            {
                !isLoading && paymentsState.length > 0 &&
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>Pago</th>
                            <th>Fecha</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>

                        {paymentsState.map((payment, i) => (
                            <tr>
                                <td>{i + 1}</td>
                                <td>{payment?.date.toLocaleDateString()}</td>
                                <td>{`$${payment?.amount.toLocaleString()}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </div>
    )
}

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Registrar pago
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type='date'></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control type='number'></Form.Control>
                    </Form.Group>
                    <Modal.Footer>
                    
                        <Button size='sm' type='submit' variant='secondary' onClick={props.onHide}>Cerrar</Button>
                        <Button size='sm' variant='dark'>Guardar</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useParams } from 'wouter';
import { createPayment } from '../service/PaymentsService';

export const RegisterPaymentModal = ({ show, setModalShow, fetchData, onHide }) => {
    const { id } = useParams()
    const [dateState, setDateState] = useState("")
    const [amountState, setAmountState] = useState("")

    const handleForm = async (e) => {
        e.preventDefault()

        const newPayment = {
            date: dateState,
            amount: amountState,
            loan: id
        }
        try {
            const response = await createPayment(newPayment)
            if(response.status === 201) {
                clearForm()
                setModalShow(false)
                fetchData()
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const clearForm = () => {
        setDateState("")
        setAmountState("")
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
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
                <Form onSubmit={(e) => handleForm(e)}>
                    <Form.Group>
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control value={dateState} required type='date' onChange={(evn) => setDateState(evn.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control value={amountState} required type='number' onChange={(evn) => setAmountState(evn.target.value)}></Form.Control>
                    </Form.Group>
                    <Modal.Footer>
                        <Button type='submit' size='sm' variant='dark'>Guardar</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export const RegisterPaymentModal = ({ loanId, show, setModalShow, fetchData, onHide }) => {

    const API_URL_BASE = import.meta.env.VITE_API_URL;
    const API_URL_COMPLEMENT = "/api"
    const API_URL = `${API_URL_BASE}${API_URL_COMPLEMENT}`

    const [dateState, setDateState] = useState("")
    const [amountState, setAmountState] = useState("")

    const savePayment = async (date, amount, loanID) => {
        let data = {
            "date": date,
            "amount": amount,
            "loanId": loanID
        }
        const REQUEST_OPTIONS = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }
        try {
            const response = await fetch(API_URL, REQUEST_OPTIONS)
            if (response.ok) {
                const data = await response.json()
                console.log(data)
            }
        } catch {
            (e) => {
                console.log('There was a error.')
                console.log(e)
            }
        }
    }

    const handleForm = (e) => {
        e.preventDefault()
        savePayment(dateState, amountState, loanId)
        fetchData(loanId)
        setModalShow(false)
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

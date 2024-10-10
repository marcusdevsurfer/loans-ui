import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useParams } from 'wouter';

export const RegisterPaymentModal = ({ show, setModalShow, fetchData }) => {
    const { id } = useParams()
    const [dateState, setDateState] = useState("")
    const [amountState, setAmountState] = useState("")

    const savePayment = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const data = {
            "date": dateState,
            "amount": amountState,
            "loanId": parseInt(id)
        }
        const response = await fetch("http://127.0.0.1:3000/api/payments", {
            method: "POST",
            body: JSON.stringify(data),
            headers: myHeaders,
        })
    }
    const handleForm = () => {
        savePayment()
        setModalShow(false)
        fetchData(id)
    }

    return (
        <Modal
            show={show}
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
                <Form onSubmit={handleForm}>
                    <Form.Group>
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control required type='date' onChange={(evn) => setDateState(evn.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control required type='number' onChange={(evn) => setAmountState(evn.target.value)}></Form.Control>
                    </Form.Group>
                    <Modal.Footer>
                        <Button type='submit' size='sm' variant='dark'>Guardar</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

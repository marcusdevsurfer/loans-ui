import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useParams } from 'wouter';

export const RegisterPaymentModal = (props) => {
    const { id } = useParams()
    const [dateState, setDateState] = useState("")
    const [amountState, setAmountState] = useState("")
    const [loanIdState, setLoanIdState] = useState("")

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
                        <Form.Control type='date' onChange={(evn) => setDateState(evn.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control type='number' onChange={(evn) => setAmountState(evn.target.value)}></Form.Control>
                    </Form.Group>
                    <Modal.Footer>
                        <Button size='sm' variant='dark' onClick={savePayment}>Guardar</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

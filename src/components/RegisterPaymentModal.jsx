import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';



export const RegisterPaymentModal = (props) => {

    const savePayment = () => {
        fetch(`http://127.0.0.1:3000/api/payments`)
            .then((response) => response.json())
            .then(data => {
                setPaymentsState(data)
                setIsLoading(false)
            })
            .catch((e) => console.log(e))
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
                <Form onSubmit={savePayment}>
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
    )
}

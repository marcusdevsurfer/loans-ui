import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const CreateLoanModal = () => {
    const loanInitialState = {
        "personId": "",
        "amount": "",
        "interestRate": "",
    }
    const [loan, setLoan] = useState(loanInitialState)
    const [persons, setPersons] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/v1/persons");
            const data = await response.json();
            setPersons(data);
            setIsLoading(false);
        }
        catch(e){
            console.error(e)
        }
        finally {
            setIsLoading(false)
        }
    }

    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loan),
        }
        try {
            const response = await fetch("http://localhost:8081/api/v1/loans/create",options)
            console.log(response)
            if(response.status === 201){
                clearForm()
                handleClose()
            }
        }catch(e){
            clearForm()
            console.error(e)
        }
    }

    const clearForm = () => {
        setLoan(loanInitialState)
    }


    return (
        <>
            <Button className='ms-auto' variant="dark" onClick={(handleShow)}>
                Nuevo
            </Button>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Prestamo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Cliente</Form.Label>
                            <Form.Select
                                onChange={(e) => setLoan({ ...loan, personId: e.target.value })}
                                value={loan.personId}
                                required
                                disabled={isLoading}
                            >
                                <option value={""}>Seleccionar cliente</option>
                                {
                                    persons.map((person) =>(
                                        <option key={person.id} value={person.id}>{`${person.name}`}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Monto</Form.Label>
                            <Form.Control required type="number" placeholder="Monto" value={loan?.amount} onChange={(e) => setLoan({...loan, amount: e.target.value})} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Interes</Form.Label>
                            <Form.Control required type="number" placeholder="Interes %" value={loan?.interestRate} onChange={(e) => setLoan({...loan, interestRate: e.target.value})} />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="danger" size='sm' onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button type='submit' size='sm' variant="dark">
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

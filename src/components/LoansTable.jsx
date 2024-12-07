import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import Spinner from "react-bootstrap/Spinner"
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'wouter'
import './css/LoansTable.css'
import { useEffect, useState } from 'react'
import { fetchLoans } from '../service/LoanService'
import { Form } from 'react-bootstrap'

export const LoansTable = () => {
    const [loansState, setLoansState] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        try {
            const loans = await fetchLoans()
            setLoansState(loans)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
    }

    return (
        isLoading ? (
            <Container className='text-center'>
                <p className='font-text'>Cargando prestamos</p>
                <Spinner className='' variant='dark' />
            </Container>
        ) :
            <div className='loans-table-section'>
                <Stack direction='horizontal' gap={1}>

                    <h2 className='dashboard-title mb-3'>Lista de prestamos</h2>
                    <Button size='sm' className='ms-auto' variant="dark" onClick={(handleShow)}>
                        Nuevo
                    </Button>

                    {/* Modal */}
                    <Modal show={showModal} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Nuevo Prestamo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicName" >
                                    <Form.Label>Cliente</Form.Label>
                                    <Form.Control type="text" placeholder="Cliente" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Monto</Form.Label>
                                    <Form.Control type="number" placeholder="Monto" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Interes</Form.Label>
                                    <Form.Control type="number" placeholder="Interes" />
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
                    {/* End Modal */}

                </Stack>
                <Table responsive striped borderless>
                    <thead>
                        <tr>
                            <th className='text-secondary'>Cliente</th>
                            <th className='text-secondary'>Monto</th>
                            <th className='text-secondary'>Interes</th>
                            <th className='text-secondary'>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loansState.map((loan) =>
                                <tr key={loan?._id}>
                                    <td>{`${loan?.borrower}`}</td>
                                    <td>{`$${loan?.amount.toLocaleString('en')}`}</td>
                                    <td>{`${loan?.interestRate}%`}</td>
                                    <td>
                                        <Link href={`admin/loan-details/${loan?._id}`}>
                                            <a className='btn btn-sm btn-dark'>Ver</a>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>

    )
}

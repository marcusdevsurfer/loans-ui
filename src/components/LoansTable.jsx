import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { CiShare1 } from "react-icons/ci";
import { Link } from 'wouter'
import './css/LoansTable.css'
import { useEffect, useState } from 'react'
import { createLoan } from '../service/LoanService'

export const LoansTable = ({ data, fetchData }) => {

    const [loansState, setLoansState] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [borrower, setBorrower] = useState('')
    const [amount, setAmount] = useState('')
    const [interestRate, setInterestRate] = useState('')

    useEffect(() => {
        filterLoansByStatus('PENDING')
    }, [])


    const filterLoansByStatus = (status) => {
        const loansFiltered = data.filter(loan => loan.status === status)
        setLoansState(loansFiltered)
    }

    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    const clearForm = () => {
        setBorrower('')
        setAmount('')
        setInterestRate('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newLoan = {
            borrower: borrower,
            amount: amount,
            interestRate: interestRate
        }
        const response = await createLoan(newLoan)
        if (response.status === 201) {
            clearForm()
            setShowModal(false)
            await fetchData()
        }
    }

    return (
        <div>
            {/* Modal */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Prestamo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control type="text" placeholder="Cliente" value={borrower} onChange={(e) => setBorrower(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Monto</Form.Label>
                            <Form.Control type="number" placeholder="Monto" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Interes</Form.Label>
                            <Form.Control type="number" placeholder="Interes" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
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
            <Stack className='align-items-center mb-3' direction='horizontal' gap={1}>
                <h2 className='dashboard-title p-0 m-0'>Lista de prestamos</h2>
                <Button className='ms-auto' variant="dark" onClick={(handleShow)}>
                    Nuevo
                </Button>
            </Stack>
            <Stack className='mb-3' direction='horizontal' gap={3}>
                <Button onClick={() => setLoansState(data)} variant='outline-dark'>
                    Todos
                </Button>
                <Button onClick={() => filterLoansByStatus('PENDING')} variant='outline-dark'>
                    En progreso
                </Button>
                <Button onClick={() => filterLoansByStatus('paid')} variant='outline-dark'>
                    Pagados
                </Button>
            </Stack>

            <Table responsive striped borderless className='align-middle text-center'>
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
                            <tr key={loan.id}>
                                <td className=''>{`jajaj`}</td>
                                <td>{`$${loan?.amount.toLocaleString('en')}`}</td>
                                <td >{`${loan?.interestRate}%`}</td>
                                <td>
                                    <Link href={`admin/loan-details/${loan?.id}`}>
                                        <Button size='sm' className='m-1' variant='dark'>
                                            <CiShare1 size='20' /> Admin
                                        </Button>
                                    </Link>
                                    <Link href={`customer/loan-details/${loan?.id}`}>
                                        <Button size='sm' className='m-1' variant='secondary'>
                                            <CiShare1 size='20' /> Cliente
                                        </Button>
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

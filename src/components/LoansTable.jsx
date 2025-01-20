import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import Spinner from "react-bootstrap/Spinner"
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { CiShare1 } from "react-icons/ci";
import { Link } from 'wouter'
import './css/LoansTable.css'
import { useEffect, useState } from 'react'
import { fetchLoans, createLoan } from '../service/LoanService'

export const LoansTable = () => {
    const [loansState, setLoansState] = useState([])
    const [allLoans, setAllLoans] = useState([])    
    const [paidLoans, setPaidLoans] = useState([])
    const [pendingLoans, setPendingLoans] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [borrower, setBorrower] = useState('')
    const [amount, setAmount] = useState('')
    const [interestRate, setInterestRate] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const loans = await fetchLoans()
            const paidLoans = loans.filter(loan => loan.status === 'paid')
            const pendingLoans = loans.filter(loan => loan.status === 'pending')
            setLoansState(loans)
            setAllLoans(loans)  
            setPaidLoans(paidLoans)
            setPendingLoans(pendingLoans)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
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
            fetchData()
        }
    }

    return (
        isLoading ? (
            <Container className='text-center'>
                <p className='font-text'>Cargando prestamos</p>
                <Spinner className='' variant='dark' />
            </Container>
        ) :
            <div className='loans-table-section'>
                <Stack className='align-items-center mb-3' direction='horizontal' gap={1}>
                    <h2 className='dashboard-title p-0 m-0'>Lista de prestamos</h2>
                    <Button className='ms-auto' variant="dark" onClick={(handleShow)}>
                        Nuevo
                    </Button>

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
                </Stack>
                <Stack className='mb-3' direction='horizontal' gap={3}>
                    <Button onClick={() => setLoansState(allLoans)} variant='outline-dark'>
                        Todos
                    </Button>
                    <Button onClick={() => setLoansState(pendingLoans)} variant='outline-dark'>
                        En progreso
                    </Button>
                    <Button onClick={() => setLoansState(paidLoans)} variant='outline-dark'>
                        Pagados
                    </Button>
                </Stack>
                <Table responsive striped borderless>
                    <thead>
                        <tr>
                            <th className='text-secondary'>Cliente</th>
                            <th className='text-secondary'>Monto</th>
                            <th className='text-secondary'>Interes</th>
                            <th className='text-secondary text-end'>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loansState.map((loan) =>
                                <tr className="" style={{ verticalAlign: 'middle' }} key={loan?._id}>
                                    <td className=''>{`${loan?.borrower}`}</td>
                                    <td>{`$${loan?.amount.toLocaleString('en')}`}</td>
                                    <td >{`${loan?.interestRate}%`}</td>
                                    <td className='text-end'>
                                        <Link href={`admin/loan-details/${loan?._id}`}>
                                            <Button size='sm' className='m-1' variant='dark'>
                                                <CiShare1 size='20' /> Admin
                                            </Button>
                                        </Link>
                                        <Link href={`customer/loan-details/${loan?._id}`}>
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

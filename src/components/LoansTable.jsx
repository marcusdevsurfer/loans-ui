import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import Spinner from "react-bootstrap/Spinner"
import Container from 'react-bootstrap/Container'
import { Link } from 'wouter'
import './css/LoansTable.css'
import { useEffect, useState } from 'react'
import { fetchLoans } from '../service/LoanService'

export const LoansTable = () => {
    const [loansState, setLoansState] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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


    return (
        isLoading ? (
            <Container className='text-center'>
                <p className='font-text'>Cargando prestamos</p>
                <Spinner className='' variant='dark' />
            </Container>
        ) :
            <div className='loans-table-section'>
                <Stack direction='horizontal'>
                    <h2 className='dashboard-title mb-3'>Lista de prestamos</h2>
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

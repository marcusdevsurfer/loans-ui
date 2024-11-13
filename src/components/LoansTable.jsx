import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import { Link } from 'wouter'
import './css/LoansTable.css'
import { useEffect, useState } from 'react'
import { fetchAndSetLoans } from '../service/LoanService'

export const LoansTable = () => {
    const [loansState, setLoansState] = useState([])

    useEffect(() => {
        fetchAndSetLoans(setLoansState)
    }, [])

    return (
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
                        <th className='text-secondary'>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loansState.map((loan) =>
                            <tr key={loan?._id}>
                                <td>{`${loan?.borrower}`}</td>
                                <td>{`$${loan?.amount.toLocaleString('en')}`}</td>
                                <td>{`${loan?.interestRate}%`}</td>
                                {loan?.status === 'approved' && <td>Aprobado</td>}
                                {loan?.status === 'pending' && <td>Pendiente</td>}
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

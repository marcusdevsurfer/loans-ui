import { useEffect, useState } from 'react'
import { CreateLoanModal } from './CreateLoanModal';
import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import { CiShare1 } from "react-icons/ci";
import { Link } from 'wouter'

import './css/LoansTable.css'


export const LoansTable = ({ data, fetchData }) => {
    const [loansState, setLoansState] = useState([])
    useEffect(() => {
        filterLoansByStatus('PENDING')
    }, [])

    const filterLoansByStatus = (status) => {
        const loansFiltered = data.filter(loan => loan.status === status)
        setLoansState(loansFiltered)
    }
    return (
        <div>
            {/* Modal */}

            <Stack className='align-items-center mb-3' direction='horizontal' gap={1}>
                <h2 className='dashboard-title p-0 m-0'>Lista de prestamos</h2>
                <CreateLoanModal />
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
                                <td>{`$${loan.amount && loan?.amount.toLocaleString('en')}`}</td>
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

import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import { Link } from 'wouter'
import './css/LoansTable.css'

export const LoansTable = ({ loans }) => {
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
                        loans.map((loan) =>
                            <tr key={loan?.id}>
                                <td>{`${loan?.client}`}</td>
                                <td>{`$${loan?.amount.toLocaleString('en')}`}</td>
                                <td>{`${loan?.interest}%`}</td>
                                <td>{loan?.status === 'active' && 'Activo'}</td>
                                <td>
                                    <Link href={`/loan-details/${loan?.id}`}>
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

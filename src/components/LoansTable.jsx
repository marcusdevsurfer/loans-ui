import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import './css/LoansTable.css'

export const LoansTable = ({ loans }) => {
    return (
        <div className='loans-table-section'>
            <Stack direction='horizontal' className='m-3' gap={1}>
                <h2 className='dashboard-title'>Lista de prestamos</h2>
                <Button variant='dark ms-auto'>Nuevo Préstamo</Button>
            </Stack>
            <Table>
                <thead>
                    <tr>
                        <th className='text-secondary p-3'>Cliente</th>
                        <th className='text-secondary p-3'>Monto</th>
                        <th className='text-secondary p-3'>Interes</th>
                        <th className='text-secondary p-3'>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loans.map((loan) =>
                            <tr key={loan?.id}>
                                <td className='p-3'>{`${loan?.client}`}</td>
                                <td className='p-3'>{`$${loan?.amount.toLocaleString('en')}`}</td>
                                <td className='p-3'>{`${loan?.interest}%`}</td>
                                <td className='p-3'>{loan?.status === 'active' && 'Activo'}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>

    )
}

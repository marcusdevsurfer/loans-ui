import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import './css/LoansTable.css'

export const LoansTable = ({ loans }) => {
    return (
        <div className='loans-table-section'>
            <Stack direction='horizontal' className='my-4' gap={1}>
                <h2 className='dashboard-title'>Lista de prestamos</h2>
                <Button variant='dark' className='ms-auto'>Nuevo Préstamo</Button>
            </Stack>
            <Table>
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
                                <td className=''>{`${loan?.client}`}</td>
                                <td className=''>{`$${loan?.amount.toLocaleString('en')}`}</td>
                                <td className=''>{`${loan?.interest}%`}</td>
                                <td className=''>{loan?.status === 'active' && 'Activo'}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>

    )
}

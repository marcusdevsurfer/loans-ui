import Table from 'react-bootstrap/Table'
import './css/LoansTable.css'

export const LoansTable = ({ loans }) => {
    return (
        <Table striped className='p-3 border border-1'>
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
    )
}

import './css/LoansTable.css'

import Table from 'react-bootstrap/Table'


export const LoansTable = ({ loans }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th className='text-red'>Cliente</th>
                    <th>Monto</th>
                    <th>Interes</th>
                    <th>Estado</th>
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
                        </tr>
                    )
                }
            </tbody>
        </Table>
    )
}

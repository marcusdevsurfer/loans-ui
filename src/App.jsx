import './App.css'
import { useState } from 'react';
import { getloans } from './service/LoanService';
import { DashboardCard } from './components/DashboardCard'
import { LoansTable } from './components/LoansTable';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import { CiDollar, CiUser, CiAlignBottom, CiCalendarDate } from "react-icons/ci";

function App() {
  const [loansState, setLoansState] = useState(getloans)
  const total = loansState.map((e) => e.amount).reduce((pv, cv) => pv + cv)
  const payByMonth = loansState.filter((loan) => loan.interest > 0).map((loan) => (loan.amount * loan.interest) / 100).reduce((pv, cv) => pv + cv)
  return (
    <Container>
      <h1 className='my-4 dashboard-title'>Panel de Administracion de Prestamos</h1>
      <Row className="justify-content-center">
        <DashboardCard text={"Prestamos Activos"} data={loansState.length} icon={<CiDollar size={'20'} />} />
        <DashboardCard text={"Total Prestado"} data={total} icon={<CiAlignBottom size={'20'} />} dollarSign />
        <DashboardCard text={"Clientes"} data={loansState.length} icon={<CiUser size={'20'} />} />
        <DashboardCard text={"Pagos del mes"} data={payByMonth} icon={<CiCalendarDate size={'20'} />} dollarSign />
      </Row>
      <Stack direction='horizontal' className='my-4' gap={1}>
        <h2 className='dashboard-title'>Lista de prestamos</h2>
        <Button variant='dark ms-auto'>Nuevo Préstamo</Button>
      </Stack>
      <Row>
        <LoansTable loans={loansState} />
      </Row>
    </Container>

  )
}

export default App

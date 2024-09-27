import { useState } from 'react';
import { getloans } from './service/LoanService';
import { DashboardCard } from './components/DashboardCard'
import { LoansTable } from './components/LoansTable';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { CiDollar, CiUser, CiAlignBottom, CiCalendarDate } from "react-icons/ci";
import './App.css'

function App() {
  const [loansState, setLoansState] = useState(getloans)
  const total = loansState.map((e) => e.amount).reduce((pv, cv) => pv + cv)
  const payByMonth = loansState.filter((loan) => loan.interest > 0).map((loan) => (loan.amount * loan.interest) / 100).reduce((pv, cv) => pv + cv)
  return (
    <Container>
      <Row className="justify-content-center my-4">
        <h1 className=' dashboard-title'>Panel de Administracion de Prestamos</h1>
        <DashboardCard text={"Prestamos Activos"} data={loansState.length} icon={<CiDollar size={'20'} />} />
        <DashboardCard text={"Total Prestado"} data={total} icon={<CiAlignBottom size={'20'} />} dollarSign />
        <DashboardCard text={"Clientes"} data={loansState.length} icon={<CiUser size={'20'} />} />
        <DashboardCard text={"Pagos del mes"} data={payByMonth} icon={<CiCalendarDate size={'20'} />} dollarSign />
      </Row>
      <Row>
        <LoansTable loans={loansState} />
      </Row>
    </Container>

  )
}

export default App

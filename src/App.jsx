
import { useState } from 'react';
import { DashboardCard } from './components/DashboardCard'
import { Container, Row } from "react-bootstrap"
import { CiDollar, CiUser, CiAlignBottom, CiCalendarDate } from "react-icons/ci";
import { getloans } from './service/LoanService';
import './App.css'
function App() {
  const [loansState, setLoansState] = useState(getloans)
  const total = loansState.map((e) => e.amount).reduce((pv, cv) => pv + cv)
  const payByMonth = loansState.filter((loan) => loan.interest > 0).map((loan) => (loan.amount * loan.interest) / 100).reduce((pv, cv) => pv + cv)
  return (
    <div style={{ minHeight: "100vh" }} >
      <Container fluid className="mb-1">
        <h1 className='my-4 dashboard-title'>Panel de Administracion de Prestamos</h1>
        <Row className="justify-content-center">
          <DashboardCard text={"Prestamos Activos"} data={loansState.length} icon={<CiDollar size={'20'} />} />
          <DashboardCard text={"Total Prestado"} data={total} icon={<CiAlignBottom size={'20'} />} dollarSign />
          <DashboardCard text={"Clientes"} data={loansState.length} icon={<CiUser size={'20'} />} />
          <DashboardCard text={"Pagos del mes"} data={payByMonth} icon={<CiCalendarDate size={'20'} />} dollarSign />
        </Row>
      </Container>
    </div>

  )
}

export default App

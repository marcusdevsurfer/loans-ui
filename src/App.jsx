import { useEffect, useState } from 'react';
import { fetchAndSetLoans } from './service/LoanService';
import { DashboardCard } from './components/DashboardCard'
import { LoansTable } from './components/LoansTable';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { CiDollar, CiUser, CiAlignBottom, CiCalendarDate } from "react-icons/ci";
import './App.css'


function App() {
  const [loansState, setLoansState] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAndSetLoans(setLoansState)
    setIsLoading(false)
  }, [])

  // const payByMonth = loansState.filter((loan) => loan?.interest > 0).map((loan) => (loan?.amount * loan?.interest) / 100).reduce((pv, cv) => pv + cv)

  const sumValuesByKey = (collection, key) => {
    return collection.map((e) => e[key]).reduce((pv, cv) => pv + cv, 0);
  }

  return (
    <Container>
      <Row className="justify-content-center align-items-center my-4">
        <h1 className='dashboard-title'>Panel de Administracion de Prestamos</h1>
        <DashboardCard text={"Prestamos Activos"} data={loansState?.length} icon={<CiDollar size={'20'} />} />
        <DashboardCard text={"Clientes"} data={loansState?.length} icon={<CiUser size={'20'} />} />
        {
          !isLoading &&
          <DashboardCard text={"Total Prestado"} data={sumValuesByKey(loansState, 'amount')} icon={<CiAlignBottom size={'20'} />} dollarSign />
        }
        {/* <DashboardCard text={"Pagos del mes"} data={payByMonth} icon={<CiCalendarDate size={'20'} />} dollarSign /> */}
      </Row>
      {
        isLoading && <h1>Cargando...</h1>
      }
      {
        !isLoading &&
        <Row>
          <LoansTable />
        </Row>
      }


    </Container>

  )
}

export default App

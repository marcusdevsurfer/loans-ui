import { useEffect, useState } from 'react';
import { fetchAndSetLoans } from './service/LoanService';
import { DashboardCard } from './components/DashboardCard'
import { LoansTable } from './components/LoansTable';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { CiDollar, CiUser, CiAlignBottom } from "react-icons/ci";
import './App.css'

function App() {
  const [loansState, setLoansState] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAndSetLoans(setLoansState)
    setIsLoading(false)
  }, [])

  const sumValuesByKey = (collection, key) => {
    return collection.map((e) => e[key]).reduce((pv, cv) => pv + cv, 0);
  }

  return (
    <Container>
      <Row className="justify-content-evenly align-items-center my-4">
        <h1 className='dashboard-title'>Panel de Administracion de Prestamos</h1>
        {
          isLoading && <Spinner className='ms-auto' variant='dark' />
        }
        {
          !isLoading &&
          <DashboardCard text={"Total Prestado"} data={sumValuesByKey(loansState, 'amount')} icon={<CiAlignBottom size={'20'} />} dollarSign />
        }
        <DashboardCard text={"Prestamos Activos"} data={loansState?.length} icon={<CiDollar size={'20'} />} />
        <DashboardCard text={"Clientes"} data={loansState?.length} icon={<CiUser size={'20'} />} />
      </Row>
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

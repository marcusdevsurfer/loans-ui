import { useEffect, useState } from 'react';
import { DashboardCard } from './components/DashboardCard'
import { LoansTable } from './components/LoansTable';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { CiDollar, CiAlignBottom } from "react-icons/ci";
import './App.css'
import { Spinner, Stack } from 'react-bootstrap';

function App() {
  const [loansState, setLoansState] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    //const response = await fetchLoans()
    try {
      const response = await fetch("http://localhost:8081/api/v1/loans")
      const data = await response.json()
      setLoansState(data)
      setIsLoading(false)
    }
    catch (e) {
      console.log(e)
    }
  }

  const sumValuesByKey = (collection, key) => {
    return collection.map((e) => e[key]).reduce((pv, cv) => pv + cv, 0);
  }

  const filterPendingLoans = (loans) => {
    return loans.filter(loan => loan.status === "PENDING")
  }

  return (
    <Container fluid className='px-4 px-sm-5 pt-3 pt-sm-4 container-bg'>
      <Row className='mb-4'>
        <h1 className='text-center text-md-start dashboard-title m-0 p-0'>Panel de Administración de Préstamos</h1>
      </Row>
      <Row className="justify-content-evenly px-2 py-3 border rounded mb-2">

        {
          !isLoading ?
            <>
              <h2 className='dashboard-title'>Resumen</h2>
              <DashboardCard text={"Total Prestado"} data={sumValuesByKey(filterPendingLoans(loansState), 'amount')} icon={<CiAlignBottom color='#000' size={'20'} />} dollarSign />
              <DashboardCard text={"Préstamos Activos"} data={filterPendingLoans(loansState)?.length} icon={<CiDollar color='#000' size={'20'} />} />
            </>
            :
            <Stack direction='horizontal' gap={2} className='justify-content-center'>
              <Spinner animation='grow' size='sm' />
              <Spinner animation='grow' size='sm' />
              <Spinner animation='grow' size='sm' />

            </Stack>

        }
      </Row>
      {
        !isLoading
        &&
        <Row className="justify-content-evenly px-2 py-3 border rounded mb-2">
          <LoansTable data={loansState} fetchData={fetchData} />
        </Row>
      }
    </Container>
  )
}

export default App

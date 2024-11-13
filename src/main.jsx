import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { Route } from 'wouter';
import { LoanAdminView } from './components/LoanAdminView.jsx';
import { LoanCustomerView } from './components/LoanCustomerView.jsx';

const Router = () => (
  <>
    <Route path="/" component={App}></Route>
    <Route path="admin/loan-details/:id">{params => <LoanAdminView id={params.id} />}</Route>
    <Route path="customer/loan-details/:id">{params => <LoanCustomerView id={params.id} />}</Route>
  </>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router />
)

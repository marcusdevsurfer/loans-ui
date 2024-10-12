import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { Route } from 'wouter';
import { LoanView } from './components/LoanView.jsx';
import { LoanCustomerView } from './components/LoanCustomerView.jsx';

const Router = () => (
  <div>
    <Route path="/" component={App}></Route>
    <Route path="admin/loan-details/:id">{params => <LoanView id={params.id} />}</Route>
    <Route path="customer/loan-details/:id">{params => <LoanCustomerView id={params.id} />}</Route>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router />
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'wouter';
import { LoanView } from './components/LoanView.jsx';
import App from './App.jsx'

const Router = () => (
  <div>
    <Route path="/" component={App}></Route>
    <Route path="/loan-details/:id">{params => <LoanView id={params.id}/>}</Route>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router />
)

import App from '../App.jsx';
import { Route, Switch } from 'wouter';
import { LoanAdminView } from './LoanAdminView.jsx';
import { LoanCustomerView } from './LoanCustomerView.jsx';
import { NotFound } from './NotFound.jsx';

export const Router = () => {
    return (
        <Switch>
            <Route path="/" component={App}></Route>
            <Route path="admin/loan-details/:id">{params => <LoanAdminView id={params.id} />}</Route>
            <Route path="customer/loan-details/:id">{params => <LoanCustomerView id={params.id} />}</Route>
            <Route component={NotFound}></Route>
        </Switch>
    )
}

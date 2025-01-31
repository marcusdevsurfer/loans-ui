import App from '../App.jsx';
import { Route, Switch, Redirect } from 'wouter';
import { LoanAdminView } from './LoanAdminView.jsx';
import { LoanCustomerView } from './LoanCustomerView.jsx';
import { NotFound } from './NotFound.jsx';
import { ApplyView } from './ApplyView.jsx';

export const Router = () => {
    return (
        <Switch >
            <Route path="/" component={() => <Redirect to='/dashboard'/>}></Route>
            <Route path="/dashboard" component={App}></Route>
            <Route path="/apply" component={ApplyView}></Route>
            <Route path="/admin/loan-details/:id">{params => <LoanAdminView id={params.id} />}</Route>
            <Route path="/customer/loan-details/:id">{params => <LoanCustomerView id={params.id} />}</Route>
            <Route component={NotFound}></Route>
        </Switch>
    )
}

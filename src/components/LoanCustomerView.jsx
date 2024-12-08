import { Container } from "react-bootstrap"
import { LoanDetails } from "./LoanDetails"
import { LoanPaymentScheduleCustomer } from "./LoanPaymentScheduleCustomer"
import PropTypes from 'prop-types';
export const LoanCustomerView = ({ id }) => {
    return (
        <Container>
            <LoanDetails loanId={id} />
            <LoanPaymentScheduleCustomer/>
        </Container>
    )
}

LoanCustomerView.propTypes = {
    id: PropTypes.string.isRequired,
};

export default LoanCustomerView;

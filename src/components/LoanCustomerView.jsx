import { Container } from "react-bootstrap"
import { LoanDetails } from "./LoanDetails"
import { LoanPaymentScheduleTable } from "./LoanPaymentScheduleTable"
import PropTypes from 'prop-types';
export const LoanCustomerView = ({ id }) => {
    return (
        <Container>
            <LoanDetails loanId={id} />
            <LoanPaymentScheduleTable  />
        </Container>
    )
}

LoanCustomerView.propTypes = {
    id: PropTypes.string.isRequired,
};

export default LoanCustomerView;

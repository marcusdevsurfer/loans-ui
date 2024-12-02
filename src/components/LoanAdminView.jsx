import { Container } from "react-bootstrap"
import PropTypes from 'prop-types';
import { LoanDetails } from "./LoanDetails"
import { LoanPaymentSchedule } from "./LoanPaymentSchedule"

export const LoanAdminView = ({ id }) => {
    return (
        <Container>
            <LoanDetails loanId={id} />
            <LoanPaymentSchedule loanId={id} />
        </Container>
    )
}
LoanAdminView.propTypes = {
    id: PropTypes.string.isRequired,
};




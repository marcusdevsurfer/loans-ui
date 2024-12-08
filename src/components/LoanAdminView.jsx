import { Container } from "react-bootstrap"
import PropTypes from 'prop-types';
import { LoanDetails } from "./LoanDetails"
import { LoanPaymentScheduleAdmin } from "./LoanPaymentScheduleAdmin";

export const LoanAdminView = ({ id }) => {
    return (
        <Container>
            <LoanDetails loanId={id} />
            <LoanPaymentScheduleAdmin loanId={id}/>
        </Container>
    )
}
LoanAdminView.propTypes = {
    id: PropTypes.string.isRequired,
};




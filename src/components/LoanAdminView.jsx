import { Container } from "react-bootstrap"
import { LoanDetails } from "./LoanDetails"
import { LoanProgress } from "./LoanProgress"

export const LoanAdminView = ({ id }) => {
    return (
        <Container>
            <LoanDetails loanId={id} />
            <LoanProgress loanId={id} />
            {/* <LoanPaymentSchedule loan={loanState} /> */}
        </Container>
    )
}

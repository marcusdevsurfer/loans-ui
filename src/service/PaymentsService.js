export const payments = [
    {
        "date": new Date(2024, 8, 16),
        "loanId": 7,
        "amount": 3000
    },
    {
        "date": new Date(2024, 8, 23),
        "loanId": 7,
        "amount": 3000
    },
    {
        "date": new Date(2024, 8, 30),
        "loanId": 7,
        "amount": 3000
    }
]

export const getPaymentsByLoanId = (id) => {
    return payments.filter((payment) => payment.loanId == id)
}
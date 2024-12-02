const API_URL_BASE = import.meta.env.VITE_API_URL;
const API_URL_COMPLEMENT = '/api/payments'
const API_URL = `${API_URL_BASE}${API_URL_COMPLEMENT}`

export const fetchPayments = async () => {
    const response = await fetch(API_URL)
    return response.json()
}
export const fetchPaymentsByLoan = async (id) => {
    const response = await fetch(`${API_URL}/${id}`)
    return response.json()
}
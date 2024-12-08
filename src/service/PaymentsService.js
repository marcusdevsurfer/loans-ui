const API_URL_BASE = import.meta.env.VITE_API_URL;
const API_URL_COMPLEMENT = '/api/payments'
const SAVE_PAYMENT_URL_COMPLEMENT = '/api/payments/save'
const SAVE_PAYMENT_URL = `${API_URL_BASE}${SAVE_PAYMENT_URL_COMPLEMENT}`
const API_URL = `${API_URL_BASE}${API_URL_COMPLEMENT}`

export const fetchPayments = async () => {
    const response = await fetch(API_URL)
    return response.json()
}

export const fetchPaymentsByLoan = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`)
        return response
    }
    catch (error) {
        console.error('Error:', error)
    }
}

export const createPayment = async (payment) => {
    const REQUEST_OPTIONS = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment),
    }
    try {
        const response = await fetch(SAVE_PAYMENT_URL, REQUEST_OPTIONS)
        return response
    } catch (error) {
        console.error('Error:', error)
    }
}
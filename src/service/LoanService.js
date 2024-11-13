const API_URL_BASE = import.meta.env.VITE_API_URL;
const API_URL_COMPLEMENT = '/api/loans'
const API_URL = `${API_URL_BASE}${API_URL_COMPLEMENT}`

export const fetchAndSetLoans = async (setLoans) => {
  try {
    const response = await fetch(API_URL)
    if (response.ok) {
      const data = await response.json()
      setLoans(data)
    } else {
      console.log('Error en la peticion')
    }
  } catch (error) {
    console.log('Error en la peticion')
  }
}

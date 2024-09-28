export const getloans = () => [
  {
    "id": 1,
    "client": "Marco Gonzalez",
    "amount": 1400,
    "interest": 0,
    "status": "active",
    "date": "date"
  },
  {
    "id": 2,
    "client": "Rosario Ramos",
    "amount": 8000,
    "interest": 10,
    "status": "active",
    "date": "date"
  },
  {
    "id": 3,
    "client": "Dalia Lavanderia",
    "amount": 5000,
    "interest": 10,
    "status": "active",
    "date": "date"
  },
  {
    "id": 4,
    "client": "Brenda Bello",
    "amount": 6000,
    "interest": 10,
    "status": "active",
    "date": "date"
  },
  {
    "id": 5,
    "client": "Ricardo Cobos",
    "amount": 100000,
    "interest": 6,
    "status": "active",
    "date": "date"
  },
  {
    "id": 6,
    "client": "Rocio Covarrubias",
    "amount": 10000,
    "interest": 10,
    "status": "active",
    "date": "date"
  },
  {
    "id": 7,
    "client": "Carmen Covarrubias",
    "amount": 60000,
    "interest": 20,
    "status": "active",
    "date": "date",
    "installments": 20
  },
  {
    "id": 8,
    "client": "Salma Salazar",
    "amount": 10000,
    "interest": 10,
    "status": "active",
    "date": "date"
  },
  {
    "id": 9,
    "client": "Kevin Mojica",
    "amount": 3000,
    "interest": 10,
    "status": "active",
    "date": "date",
    "installments": 3
  }
]

export const getLoanById = (id) => {
  return getloans().find((loan) => loan.id == id)
}
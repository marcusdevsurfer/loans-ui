import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

export const ApplyView = () => {

    const [customer, setCustomer] = useState('');
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState(0);
    const [paymentTerm, setPaymentTerm] = useState(0);
    const [interesRate, setInterestRate] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(customer, phone, amount, paymentTerm, interesRate);
        alert('Formulario enviado');
    }
    const handleSelect = (e) => {
        setPaymentTerm(e.target.value);
        switch (e.target.value) {
            case '1':
                setInterestRate(15);
                break;
            case '3':
                setInterestRate(20);
                break;
            case '6':
                setInterestRate(25);
                break;
            case '12':
                setInterestRate(28);
                break;
            default:
                setInterestRate(0);
                break;
        }
    }


    return (
        <Container className='card'>
            <div className='mb-3'>
                <h1 className='m-0 p-0'>Solicita un nuevo préstamo</h1>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Text>Ingresa tu nombre</Form.Text>
                    <Form.Control type='text' placeholder='Nombre completo' value={customer} onChange={(e) => setCustomer(e.target.value)} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Text>Ingresa tu numero telefonico</Form.Text>
                    <Form.Control type='number' placeholder='Numero de telefono' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Text>Ingresa la cantidad que deseas solicitar</Form.Text>
                    <Form.Control type='number' placeholder='Ingresa el monto deseado' value={amount} onChange={(e) => setAmount(e.target.value)} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Text>Selecciona el plazo de pago</Form.Text>
                    <Form.Select value={paymentTerm} aria-label='Plazo de pago' onChange={handleSelect}>
                        <option defaultValue>Selecciona una de las opciones</option>

                        <option value={1}>1 mes</option>
                        <option value={3}>3 meses</option>
                        <option value={6}>6 meses</option>
                        <option value={12}>12 meses</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Text>Interes</Form.Text>
                    <Form.Control type='text' value={`${interesRate}%`} readOnly />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Check type='checkbox' label='Acepto los términos y condiciones' />
                </Form.Group>

                <Form.Group className='text-center'>
                    <button type='submit' className='btn btn-dark'>Enviar solicitud</button>
                </Form.Group>
            </Form>
        </Container>
    )
}

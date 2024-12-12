import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

export const ApplyView = () => {
    return (
        <Container className='card'>
            <div className='mb-3'>
                <h1 className='m-0 p-0'>Solicita un nuevo préstamo</h1>
            </div>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Text>Ingresa tu nombre</Form.Text>
                    <Form.Control type='text' placeholder='Nombre' />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Text>Ingresa tu correo electronico</Form.Text>
                    <Form.Control type='email' placeholder='Correo electronico' />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Text>Ingresa tu numero telefonico</Form.Text>
                    <Form.Control type='number' placeholder='Numero de telefono' />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Text>Ingresa la cantidad que deseas solicitar</Form.Text>
                    <Form.Control type='number' placeholder='Cantidad' />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Text>Selecciona el plazo de pago</Form.Text>
                    <Form.Select aria-label='Plazo de pago'>
                        <option>1 mes</option>
                        <option>3 meses</option>
                        <option>6 meses</option>
                        <option>12 meses</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Text>Interes</Form.Text>
                    <Form.Control type='text' value='10%' readOnly />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Check type='checkbox' label='Acepto los términos y condiciones' />
                </Form.Group>

                <Form.Group className='text-center'>
                    <button type='submit' className='btn btn-primary'>Enviar solicitud</button>
                </Form.Group>
            </Form>
        </Container>
    )
}

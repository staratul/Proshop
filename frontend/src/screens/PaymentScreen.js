import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const history = useNavigate();

    if(!shippingAddress) {
        history('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='PayPal or Credit Card' 
                            id='PayPal' value="PayPal" checked name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        {/*<Form.Check type='radio' label='Stripe' 
                            id='Stripe' value="Stripe" name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>*/}
                    </Col>
                </Form.Group>
                <Button type="submit" className="my-3" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen

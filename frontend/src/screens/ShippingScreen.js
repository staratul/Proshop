import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const history = useNavigate();

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address" required value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter city" required value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter postal code" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Enter country" required value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type="submit" className="my-3" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen

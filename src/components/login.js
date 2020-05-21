import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Col, Form } from 'react-bootstrap'
import { setAuthedUser } from '../actions/authedUser'
import { fakeAuth } from '../authentication/auth'
import { Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Login extends Component {
    state = {
        userId: null,
        redirectToReferrer: false
    }
    handleChange = (e) => {
        this.setState({
            userId: e.target.value
        })
    }
    login = (e) => {
        e.preventDefault()
        fakeAuth.authenticate(() => {
            this.setState({
                redirectToReferrer: true
            })
        })
        this.props.dispatch(setAuthedUser(this.state.userId))
    }
    render() {
        const { redirectToReferrer } = this.state
        const { from } = this.props.location.state || { from : { pathname: '/' } }

        if (redirectToReferrer === true) {
            return (
                <Redirect to={from} />
            )
        }
        return (
            <Container>
                <Col xs={6}>
                    <Card>
                        <Card.Header as="h5">Would You Rather App</Card.Header>
                        <Card.Body>
                            <Card.Title>Sign In to begin the game</Card.Title>
                            <Form>
                                <Form.Group controlId="users">
                                    <Form.Control as="select" onChange={this.handleChange}>
                                    <option hidden value="default">Sign in</option>
                                        {this.props.users.map((id) => (
                                            <option key={id} value={id}>
                                                {id}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" onClick={this.login}>Sign in</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.keys(users)
    }
}

export default connect(mapStateToProps)(Login)
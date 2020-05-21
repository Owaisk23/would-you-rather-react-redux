import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Form, Button, Col, ProgressBar, Badge } from 'react-bootstrap'
import { handleAnswer } from '../actions/shared'
import NavigationBar from './navigationBar'
import '../App.css'

class QuestionView extends Component {
    state = {
        selectedValue : null
    }
    handleChange = (e) => {
        this.setState({
            selectedValue: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        this.props.dispatch(handleAnswer(this.props.authedUser, this.props.match.params.id, this.state.selectedValue))
    }
    render() {
        if(this.props.error) {
            return (
                <Container>
                    <Col>
                        <h1>404</h1>
                        <p>The page not found</p>
                    </Col>
                </Container>
            )
        }

        let ques = this.props.q ? this.props.q : ''
        let answerMarkOp1 = this.props.q ? this.props.q.optionOne.votes.includes(this.props.authedUser) : null
        let answerMarkOp2 = this.props.q ? this.props.q.optionTwo.votes.includes(this.props.authedUser) : null
        return (
            <div>
                <NavigationBar />
                <Container>
                    {answerMarkOp1 === true || answerMarkOp2 === true ? (
                        <Col xs={6} md={6}>
                            <Card>
                                <Card.Img variant="top" src={this.props.author.avatarURL} />
                                <Card.Body>
                                    <Card.Title>Asked by {this.props.author.name}</Card.Title>
                                    <Card.Text>
                                        Results:
                                    </Card.Text>
                                    <div>
                                        <div className="cell">
                                            <div>
                                                {answerMarkOp1 ? (
                                                    <Badge pill variant="warning">
                                                        Your Vote
                                                    </Badge>
                                                ) : ' '}
                                            </div>
                                            Would you rather {ques ? ques.optionOne.text : ''}
                                            <ProgressBar now={ques ? (ques.optionOne.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length)) * 100 : ''}
                                                label={`${ques ? (ques.optionOne.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length)) * 100 : ''}%`} />
                                            <p>{ques ? `${ques.optionOne.votes.length} out of ${ques.optionTwo.votes.length + ques.optionOne.votes.length}` : ' '}</p>
                                        </div>
                                        <div className="cell">
                                            <div>
                                                {answerMarkOp2 ? (
                                                    <Badge pill variant="warning">
                                                        Your Vote
                                                    </Badge>
                                                ) : ' '}
                                            </div>
                                            Would you rather {ques ? ques.optionTwo.text : ''}
                                            <ProgressBar now={ques ? (ques.optionOne.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length)) * 100 : ''}
                                                label={`${this.props.q ? (ques.optionTwo.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length)) * 100 : ''}%`} />
                                            <p>{ques ? `${ques.optionTwo.votes.length} out of ${ques.optionTwo.votes.length + ques.optionOne.votes.length}` : ' '}</p>
                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    ) : (
                            <Col xs={6} md={6}>
                                <Card>
                                    <Card.Img variant="top" src={this.props.author.avatarURL} />
                                    <Card.Body>
                                        <Card.Title>{this.props.author.name} asks</Card.Title>
                                        <Card.Text>
                                            Would you rather
                                        </Card.Text>
                                        <Form.Group>
                                        <div className="mb-3">
                                            <Form.Check
                                                type="radio"
                                                name="select"
                                                label={ques ? ques.optionOne.text : ''}
                                                onChange={this.handleChange}
                                                value="optionOne"
                                            />

                                            <Form.Check
                                                type="radio"
                                                name="select"
                                                label={ques ? ques.optionTwo.text : ''}
                                                onChange={this.handleChange}
                                                value="optionTwo"
                                            />
                                        </div>
                                        </Form.Group>
                                        <Button variant="primary" block onClick={this.onSubmit}>Submit</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                </Container>
            </div>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }, { match }) {
    if(questions[match.params.id] === undefined) {
        const error = true;
        return {
            error
        }
    }

    let q = questions[match.params.id]
    let author = q ? users[q.author] : ''
    return {
        q: questions[match.params.id],
        author,
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionView)
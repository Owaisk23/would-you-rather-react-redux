import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavigationBar from './navigationBar'
import { Container, Col, Nav } from 'react-bootstrap'
import Poll from './Poll'
import '../App.css'

class Home extends Component {
    state = {
        questionSwitch : false,
    }

    handleChangeAnswered = () => {
        this.setState({
            questionSwitch : true
        })
    }
    handleChangeUnAnswered = () => {
        this.setState({
            questionSwitch : false
        })
    }
   
    render() {
        return (
            <div>
                <NavigationBar />
                <Container>
                    <Col xs={6} md={6}>
                        <Nav justify variant="tabs" defaultActiveKey="link-1">
                            <Nav.Item>
                                <Nav.Link eventKey="link-1" onClick={this.handleChangeUnAnswered}>Unanswered</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2" onClick={this.handleChangeAnswered}>Answered</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        {this.state.questionSwitch === false ? (
                            this.props.unAnsweredQuestions.map((q) => (
                                <Poll key={q.id} ques={q} />
                            ))
                        ) : this.props.answeredQuestions.map((q) => (
                            <Poll key={q.id} ques={q} />
                        ))}
                    </Col>
                </Container>
            </div>
        )
    }
}
function mapStateToProps({ users, questions, authedUser }) {
    let allQuestions = Object.values(questions)
    let loggedInUser = users[authedUser] 
    let loggedInAnswers = loggedInUser ? Object.keys(loggedInUser.answers) : []
    return {
        answeredQuestions : allQuestions.filter((question) => loggedInAnswers.includes(question.id))
                                        .sort((a, b) => b.timestamp - a.timestamp),
        unAnsweredQuestions: allQuestions.filter((question) => !loggedInAnswers.includes(question.id))
                                        .sort((a, b) => b.timestamp - a.timestamp)
    }
}
export default connect(mapStateToProps)(Home)

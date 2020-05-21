import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import '../App.css'

class LeaderboardCard extends Component {
    render() {
        const { user } = this.props
        return (
                <Card>
                    <Card.Img variant="top" src={user.avatarURL} />
                    <Card.Body>
                        <Card.Title>{user.name}</Card.Title>
                            <div className="cell">Answered Questions: {Object.keys(user.answers).length}</div>
                            <div className="cell">Created Question: {user.questions.length}</div>
                            <div className="cell">Score: {Object.keys(user.answers).length + user.questions.length}</div>
                    </Card.Body>
                </Card>
        )
    }
}

export default LeaderboardCard
import { RECEIVE_QUESTIONS, SAVE_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case SAVE_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        case SAVE_QUESTION_ANSWER: 
            const votes = state[action.qid][action.answer].votes
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: votes.concat([action.authedUser])
                    }
                }
            }
        default:
            return state
    }
}
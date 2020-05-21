export const RECIEVE_USERS = 'RECIEVE_USERS'
export const SAVE_USER_QUESTION = 'SAVE_USER_QUESTION'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'


export function recieveUsers(users) {
    return {
        type: RECIEVE_USERS,
        users,
    }
}

export function saveUserQuestion (user, qid) {
    return {
      type: SAVE_USER_QUESTION,
      user,
      qid,
    }
  }

  export function saveUserAnswer (user, qid, answer) {
    return {
      type: SAVE_USER_ANSWER,
      user,
      qid,
      answer
    }
  }
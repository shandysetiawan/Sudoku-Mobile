const initialState = { board: [], boardAnswer: [], solved: [], status: {}, loading: false, error: "" }


export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_BOARD_ANSWER_BOARD":
            return { ...state, board: action.payload.sudoku, boardAnswer: JSON.parse(JSON.stringify(action.payload.sudoku)) }
        case "SET_SOLVED":
            // console.log(action.payload.board)
            return { ...state, solved: action.payload.solved }
        case "CHECK_BOARD":
            return { ...state, status: action.payload.status }
        case 'REFRESH_BOARD':
            return { ...state, solved: [] }
        case 'RESET_BOARD':
            return { ...state, board: state.board }
        default:
            return state

    }


}
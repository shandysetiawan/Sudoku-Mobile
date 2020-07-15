import axios from 'axios'
const url = 'https://sugoku2.herokuapp.com'


export function fetchBoard(difficulty) {
    return (dispatch) => {

        axios({
            method: 'get',
            url: `${url}/board?difficulty=${difficulty}`,
        })
            .then((response) => {
                // console.log(response.data)
                dispatch({
                    type: "SET_BOARD_ANSWER_BOARD",
                    payload: { sudoku: response.data.board }
                })
            })
            .catch(error => console.log(error));
    }
    // return (dispatch) => {
    //     fetch(`${url}/board?difficulty=${difficulty}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             dispatch({
    //                 type: "SET_BOARD_ANSWER_BOARD",
    //                 payload: { sudoku: data.board }
    //             })
    //         })
    //         .catch(err => {
    //             dispatch({
    //                 type: "SET_BOARD_ANSWER_BOARD",
    //                 payload: { error: err }
    //             })
    //         })
    // }

    // return {
    //     type: "SET_BOARD_ANSWER_BOARD",
    //     payload: {
    //         sudoku: [[0, 0, 0, 0, 0, 0, 8, 0, 0], [0, 0, 4, 0, 0, 8, 0, 0, 9], [0, 7, 0, 0, 0, 0, 0, 0, 5], [0, 1, 0, 0, 7, 5, 0, 0, 8], [0, 5, 6, 0, 9, 1, 3, 0, 0], [7, 8, 0, 0, 0, 0, 0, 0, 0], [0, 2, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 9, 3, 0, 0, 1, 0], [0, 0, 5, 7, 0, 0, 4, 0, 3]]
    //     }
    // }

}

export function checkBoard(check) {


    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
        Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');

    // console.log('kesini4')
    return (dispatch) => {
        const data = { board: check }
        // console.log('bntuknya', data)
        fetch('https://sugoku.herokuapp.com/validate', {
            method: 'POST',
            body: encodeParams(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then((response) => {
                // console.log(response.data)
                dispatch({
                    type: "CHECK_BOARD",
                    payload: { status: response }
                })
            })
            .catch(console.warn)

    }
}

export function solveBoard(boardPuzzle) {

    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
        Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');
    return (dispatch) => {
        const data = { board: boardPuzzle }

        fetch('https://sugoku.herokuapp.com/solve', {
            method: 'POST',
            body: encodeParams(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then((response) => {
                // console.log('di solve', response.solution)
                dispatch({
                    type: "SET_SOLVED",
                    payload: { solved: response.solution }
                })
            })

            .catch(console.warn)
    }

}

export function refreshBoard() {
    return {
        type: "REFRESH_BOARD"
    }
}

export function resetBoard() {
    return {
        type: "RESET_BOARD"
    }
}
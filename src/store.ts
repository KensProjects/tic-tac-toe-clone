import { create } from 'zustand'

export type PlayerType = "X" | "O"

export type PlayerStateType = undefined | PlayerType

export type GameStore = {
    board: PlayerStateType[],
    winner: PlayerStateType | null,
    player: PlayerType,
    playerXIdxs: number[],
    playerOIdxs: number[],
    checkBoard: () => void,
    setPlayer: () => void,
    addLetterToBoard: (idx: number) => void,
    updatePlayerIdxs: (idx: number) => void,
    handleTileClick: (idx: number) => void[],
    resetGame: () => void
}

const diagonalMatchIdx = [[0, 4, 8], [2, 4, 6]]
const horizontalMatchIdx = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
const verticalMatchIdx = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]
const matchingIdxArr = [diagonalMatchIdx, horizontalMatchIdx, verticalMatchIdx].flat()

const intialBoardArr = new Array(9).fill(undefined) as PlayerStateType[]

const initialGameState = {
    board: intialBoardArr as PlayerStateType[],
    winner: undefined as PlayerStateType,
    player: "X" as PlayerType,
    playerXIdxs: [] as number[],
    playerOIdxs: [] as number[],
}

export const useGameStore = create<GameStore>()((set, get) => ({
    board: intialBoardArr,
    player: "X" as PlayerType,
    playerXIdxs: [] as number[],
    playerOIdxs: [] as number[],
    winner: undefined,
    setPlayer: () => {
        const player = get().player
        if (player === "X") {
            set({ player: "O" })
        } else {
            set({ player: "X" })
        }
    },
    addLetterToBoard: (boardIdx) => {
        const board = get().board
        const player = get().player
        const newBoard = board.map((tile, i) => {
            if (boardIdx === i) {
                return player
            }
            return tile
        })
        set({ board: newBoard })
    },

    checkBoard: () => {
        const playerXIdxs = get().playerXIdxs
        const playerOIdxs = get().playerOIdxs
        const board = get().board
        const winner = get().winner
        const boardIsFull = board.every(tile => (
            tile !== undefined
        ))
        const noWinner = winner === undefined
        const OHasMatches = matchingIdxArr.some((matchingArr) => {
            return matchingArr.every(idx => (
                playerOIdxs.includes(idx)
            ))
        })
        const XHasMatches = matchingIdxArr.some((matchingArr) => {
            return matchingArr.every(idx => (
                playerXIdxs.includes(idx)
            ))
        })
        if (OHasMatches) {
            set({ winner: "O" })
        } else if (XHasMatches) {
            set({ winner: "X" })
        } else if (boardIsFull && noWinner) {
            set({ winner: null })
        }
    },
    updatePlayerIdxs: (idx) => {

        const player = get().player

        if (player === "X") {
            set((state) => ({ playerXIdxs: [...state.playerXIdxs, idx].flat() }))
        }
        else if (player === "O") {
            set((state) => ({ playerOIdxs: [...state.playerOIdxs, idx].flat() }))
        } else {
            return
        }
    },
    handleTileClick: (idx) => {

        const addLetterToBoard = get().addLetterToBoard
        const updatePlayerIdxs = get().updatePlayerIdxs
        const setPlayer = get().setPlayer

        return [addLetterToBoard(idx),
        updatePlayerIdxs(idx),
        setPlayer()]
    },
    resetGame: () => {
        set(initialGameState)
    }
}))



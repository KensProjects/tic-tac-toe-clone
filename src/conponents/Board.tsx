import { useEffect } from "react"
import { useGameStore, type GameStore } from "../store"
import Tile from "./Tile"

export default function Board() {

    const board = useGameStore((state: GameStore) => state.board)
    const playerXIdxs = useGameStore((state: GameStore) => state.playerXIdxs)
    const playerOIdxs = useGameStore((state: GameStore) => state.playerOIdxs)
    const checkBoard = useGameStore((state: GameStore) => state.checkBoard)

    useEffect(() => {
        checkBoard()
    }, [playerXIdxs, playerOIdxs])

    return (
        <ul className="grid grid-cols-3 justify-center items-center w-auto h-auto border border-black">
            {board.map((tile, idx) => (
                <li key={idx} className="w-full h-full flex justify-center items-center border border-black hover:bg-gray-200">
                    <Tile tile={tile} idx={idx} />
                </li>
            ))}
        </ul>
    )
}

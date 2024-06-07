import { type GameStore, useGameStore, type PlayerStateType } from "../store"

export default function Tile({ tile, idx }: { tile: PlayerStateType, idx: number }) {

    const handleTileClick = useGameStore((state: GameStore) => state.handleTileClick)
    const winner = useGameStore((state: GameStore) => state.winner)

    const winnerChosen = winner !== undefined && winner !== null
    const winningPlayer = tile !== undefined && tile === winner

    return (
        <button className={`sm:w-48 sm:h-48 h-28 w-28 flex justify-center items-center ${winningPlayer && "bg-green-400"}`} onClick={() => handleTileClick(idx)} disabled={winnerChosen}>
            {tile}
        </button>
    )
}

import { useGameStore, type GameStore } from '../store'

export default function ResetButton() {

    const resetGame = useGameStore((state: GameStore) => state.resetGame)

    return (
        <button className='w-40 h-12 bg-green-300 rounded-lg' onClick={() => resetGame()}>Reset?</button>
    )
}

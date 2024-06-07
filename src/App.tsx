import Board from "./conponents/Board"
import ResetButton from "./conponents/ResetButton"
import { useGameStore, type GameStore } from "./store"

function App() {

  const player = useGameStore((state: GameStore) => state.player)
  const winner = useGameStore((state: GameStore) => state.winner)

  const winnerChosen = winner !== undefined && winner !== null
  const noWinner = winner === null
  const gameOver = winnerChosen || noWinner

  return (
    <div className={`w-screen h-screen flex flex-col justify-center items-center relative ${winnerChosen && "gap-8"}`}>

      <h1>Tic-Tac-Toe</h1>
      
      {winnerChosen && <span>{winner} wins</span>}

      {!gameOver ? <span className="mb-8">Player: {player}</span> : <ResetButton />}

      <Board />

    </div>
  )
}

export default App

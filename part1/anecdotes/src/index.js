import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, clickHandler }) => <button onClick={ clickHandler }>{ text }</button>

const Anecdote = ({ text, votes }) => (
  <>
    <q>{ text }</q>
    <p>Has { votes } votes.</p>
  </>
)

const AnecdoteOfTheDay = ({ anecdotes, votes, setVotes }) => {
  const [ selected, setSelected ] = useState(0)

  const vote = (index) => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)
  }

  const selectRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote text={ anecdotes[selected] } votes={ votes[selected] } />
      <Button text="vote" clickHandler={ () => { vote(selected) } } />
      <Button text="next anecdote" clickHandler={ selectRandom } />
    </>
  )
}

const AnecdoteMostVotes = ({ anecdotes, votes }) => {
  let mostVoted = 0
  let mostVotes = 0
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > mostVotes) {
      mostVotes = votes[i]
      mostVoted = i
    }
  }

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={ anecdotes[mostVoted] } votes={ mostVotes } />
    </>
  )
}

const App = (props) => {
  const [ votes, setVotes ] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf, 0))

  return (
    <div>
      <AnecdoteOfTheDay anecdotes={ anecdotes } votes={ votes } setVotes= { setVotes } />
      <AnecdoteMostVotes anecdotes={ anecdotes } votes={ votes } />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
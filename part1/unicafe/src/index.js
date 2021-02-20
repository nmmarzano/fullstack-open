import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, clickHandler }) => <button onClick={ clickHandler }>{ text }</button>

const Statistic = ({ text, value }) => <tr><td>{ text }</td><td>{ value }</td></tr>

const Statistics = ({ good, neutral, bad }) => {

  const sumAll = () => good + neutral + bad

  const averageAll = () => {
    if (sumAll() == 0){
      return 0
    } else {
      return (good - bad)/sumAll()
    }
  }

  const positivePercentage = () => {
    if (sumAll() == 0) {
      return 0
    } else {
      return ((good * 100) / sumAll()) + '%'
    }
  }

  if (sumAll() == 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic text="good" value={ good } />
            <Statistic text="neutral" value={ neutral } />
            <Statistic text="bad" value={ bad } />
            <Statistic text="all" value={ sumAll() } />
            <Statistic text="average" value={ averageAll() } />
            <Statistic text="positive" value={ positivePercentage() } />
          </tbody>
        </table>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increase = (rating, setter) => () => {
    setter(rating + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" clickHandler={ increase(good, setGood) } />
      <Button text="neutral" clickHandler={ increase(neutral, setNeutral) } />
      <Button text="bad" clickHandler={ increase(bad, setBad) } />
      <Statistics good={ good } neutral={ neutral } bad={ bad } />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
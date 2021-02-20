import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  const components = [];
  props.parts.forEach(part => {
    components.push(<Part part={ part.name } exercises={ part.exercises }/>);
  });
  return (
    <div>
      { components }
    </div>
  )
}

const Total = (props) => {
  const sum = props.parts.map(part => part.exercises).reduce((acc, current) => acc + current);
  return (
    <>
      <p>Number of exercises { sum }</p>
    </>
  )
}

const TimeFooter = (props) => {
  const [ date, setDate ] = useState((new Date()).toTimeString());

  setTimeout(
    () => setDate((new Date()).toTimeString()),
    1000
  )

  return (
    <footer>{ date }</footer>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <div>
        <Header course={ course.name } />
        <Content parts={ course.parts } />
        <Total parts={ course.parts } />
      </div>
      <TimeFooter />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ name }) => <h1>{ name }</h1>

const Part = ({ part, exercises }) => <p>{ part } { exercises }</p>

const Content = ({ parts }) => {
  const components = [];
  parts.forEach(part => {
    components.push(<Part key={ part.name } part={ part.name } exercises={ part.exercises }/>);
  });

  return (
    <div>{ components }</div>
  )
}

const Total = ({ parts }) => {
  const sum = parts.map(part => part.exercises).reduce((acc, current) => acc + current);

  return (
    <b>Total of { sum } exercises</b>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={ course.name } />
      <Content parts={ course.parts } />
      <Total parts={ course.parts } />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ]
  }

  return (
    <>
      <Course course={ course } />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
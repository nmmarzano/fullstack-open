import React from 'react'

const Header = ({ name }) => <h2>{ name }</h2>

const Part = ({ part, exercises }) => <p>{ part } { exercises }</p>

const Content = ({ parts }) => {
  const components = [];
  parts.forEach(part => {
    components.push(<Part key={ part.id } part={ part.name } exercises={ part.exercises }/>);
  });

  return (
    <div>{ components }</div>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((acc, current) => acc + current.exercises, 0);

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

export default Course
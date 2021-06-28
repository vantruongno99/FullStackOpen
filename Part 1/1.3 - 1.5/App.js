import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        <Part part={props.part1.name} exercise={props.part1.exercises} />
      </p>
      <p>
        <Part part={props.part2.name} exercise={props.part2.exercises} />
      </p>
      <p>
        <Part part={props.part3.name} exercise={props.part3.exercises} />
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.part}  {props.exercise}
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>{props.part1.exercises + props.part2.exercises + props.part3.exercises}</p>
    </div>
  )
}


export default App
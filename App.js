import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course}/>
      <p>
        <Part part={part1} exercise={exercises1} />
      </p>
      <p>
        <Part part={part2} exercise={exercises2} />
      </p>
      <p>
        <Part part={part3} exercise={exercises3} />
      </p>
      <Total exercises1={exercises1} exercises2= {exercises2} exercises3 = {exercises3} />
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

const Total = (props)=>
{
  return(
    <div>
      <p>{props.exercises1 + props.exercises2 + props.exercises3 }</p>
    </div>
  )
}


export default App
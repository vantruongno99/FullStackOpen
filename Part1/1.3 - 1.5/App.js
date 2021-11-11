import React from 'react'

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
    <div>
       <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
      </p>
      <p>
        <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
      </p>
      <p>
        <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
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
      <p>{props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}


export default App
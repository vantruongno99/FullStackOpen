import React from 'react';

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course}></Header>
            <Content courses={course.parts}></Content>
            <Total courses={course.parts}></Total>
        </div >

    )
}

export default Course;

const Header = ({ course }) => {
    return (<div>
        <h2>{course.name}</h2>
    </div>)
}

const Content = ({ courses }) => {
    return (
        <div>
            <ul >
                {courses.map(course =>
                    <li key={course.id} >
                        {course.name}  {course.exercises}
                    </li>)}
            </ul>
        </div>
    )
}



const Total = ({ courses }) => {
    const sum = courses.reduce((sum, course) => {
      return sum + course.exercises;
    }, 0);
  
    return <h4>Total of {sum} exercises</h4>;
  };


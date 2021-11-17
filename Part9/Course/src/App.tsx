import React from 'react';
const App = () => {
  const courseName = "Half Stack application development";
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CourseNormalPart extends CoursePartBase {
    type: "normal";
    description: string;
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartBase {
    type: "submission";
    description: string;
    exerciseSubmissionLink: string;
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;


  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    }
  ]

  const Total = ({ courseParts }: { courseParts: CoursePart[] }) => (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )

  const Header = ({ courseName }: { courseName: string }) => (
    <h1>{courseName}</h1>
  )

  const Body = ({ courseParts }: { courseParts: CoursePart[] }) => (
    <div>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </div>
  )

  const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.type) {
      case 'normal': {
        return (
          <div>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
            <p>{coursePart.description}</p>
          </div>
        )
      }
      case "groupProject": {
        return (
          <div>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
            <p>project exercises {coursePart.groupProjectCount}</p>
          </div>
        );
      }
      case "submission": {
        return (
          <>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
            <p>{coursePart.description}</p>
            <p>submit to {coursePart.exerciseSubmissionLink}</p>
          </>
        );
      }

      default: {
        return <div></div>
      }
    }
  }

  return (
    <div>
      <Header courseName={courseName} />
      <Body courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
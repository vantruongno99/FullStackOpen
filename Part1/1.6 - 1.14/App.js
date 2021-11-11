import React, { useState } from 'react'

// const App = () => {
//   const [good, setGood] = useState(0);
//   const [bad, setBad] = useState(0);
//   const [neutral, setNeutral] = useState(0);

//   const goodtClick = () => {
//     setGood(good + 1)
//   }

//   const badClick = () => {
//     setBad(bad + 1)
//   }
//   const neutralClick = () => {
//     setNeutral(neutral + 1);
//   }
//   return (
//     <div>
//       <h2>give feedback</h2>
//       <Button handleClick={goodtClick} text="good" />
//       <Button handleClick={badClick} text="badd" />
//       <Button handleClick={neutralClick} text="neutral" />
//       <Statistics good={good} neutral={neutral} bad={bad} />
//     </div>
//   )
// }

// const Statistic = ({ text, value }) => (
//   <div>
//     {text}: {value}
//   </div>
// )

// const Button = ({ handleClick, text }) => (
//   <div>
//     <button onClick={handleClick}>{text}</button>
//   </div>
// )

// const Statistics = ({neutral,good,bad}) => {
//   if (neutral + good + bad !== 0) {

//     return (
//       <div>
//         <h2>Statistics</h2>
//         <Statistic text ="Good" value = {good}/>
//         <Statistic text ="Bad" value = {bad}/>
//         <Statistic text ="Neutral" value = {neutral}/>
//         <Statistic text ="All" value = {bad + good + neutral}/>
//         <Statistic text ="Average" value = {(good - bad) / (good + bad)}/>
//         <Statistic text ="Positive" value = {((good * 100 )/ (good + bad))+'%'}/> 
//       </div>
//     )
//   }
//   return (<div>
//     <h2>No static</h2>
//   </div>)
// }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState(0);
  const [point, setPoint] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 })

  const Random = () => setSelected(Math.floor(Math.random() * 7));
  const Vote = () => {
    const copy = { ...point };
    copy[selected] += 1;
    setPoint(copy);
  }
  const maxIndex = () => {
    let max = 0;
    for (let i = 0; i < anecdotes.length; i++) {
      if (point[i] > point[max])
        max = i;
    }
    return max;
  }

  
  return (
    <div>
      <h2>Anecdotes of the day</h2>
      {anecdotes[selected]} <br />
      has {point[selected]} <br />
      <button onClick={Vote}>vote</button>
      <button onClick={Random}>Select next</button>
      <h2>Anecdotes with highest vote</h2>
      {anecdotes[maxIndex()]}
    </div>
  )
}






export default App
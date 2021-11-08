import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";


const BASE_URL = "http://localhost:4000/questions"

function QuestionList() {
  //making a state array so we can store the question from the API
  const [questionArray, setQuestionArray] = useState([])

  //using fetch hook to get the data from the BASE_URL
  useEffect(() => {
    fetch(BASE_URL)
      .then(r => r.json())
      .then(questions => setQuestionArray(questions))
    //putting the dependencies so it doesnt render everytime !!!!!IMPORTANT TO PUT THE DEPENDENCIES
  }, [])
  //handles the item that was selected in the question to delete
  const handleDelete = (deletingItem) => {
    //filtering the question id and if it matched the item that was being deleted it will not add
    const filtered = questionArray.filter(item => item.id !== deletingItem.id)
    //setting the new questionArray to the same array as the filtered array
    setQuestionArray(filtered)
  }



  //mapping thru the question array and setting it to questionDisplay to be passed in QuestionItem as a prop
  const questionDisplay = questionArray.map(question => {
    //for every question call QuestionItem and pass these as a prop
    return <QuestionItem
      question={question}
      key={question.id}
      onDelete={handleDelete}
    />
  })


  return (
    <section>
      <h1>Quiz Questions</h1>
      {/* calling the questionDisplay to display all the question one at a time */}
      <ul>{questionDisplay}</ul>
    </section>
  );
}

export default QuestionList;

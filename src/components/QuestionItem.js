import React from "react";
const BASE_URL = "http://localhost:4000/questions"


function QuestionItem({ question, onDelete }) {
  //destructuring the props
  const { id, prompt, answers, correctIndex } = question;

  //mapping thru the answers 
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  //actually deleting the question that was picked 
  //matching if the question id and the toBeDeletedQuestion id 
  const handleDelete = () => {
    fetch(BASE_URL + `${question.id}`, {
      method: "DELETE"
    })
      .then(r => r.json())
      //calling the prop that was passed in called onDelete that if they clicked the button it will call onDElete
      //and pass it back to questionList to filter it
      .then(() => onDelete(question))
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

import React, { useState } from "react";
import "./App.css";

export default function AddBoloForm() {
  const [question, setQuestion] = useState("");
  const [option1, setoption1] = useState("");
  const [option2, setoption2] = useState("");
  const [option3, setoption3] = useState("");
  const [option4, setoption4] = useState("");
   const handelSubmit = (e) => {
    e.preventDefault();
    console.log(question,option1,option2,option3,option4);
  };
  return (
    <div className="container allBackground">
      <div className="row">
        <h1 className="text-center mt-2">Add Question Bank</h1>
        <div className="card">
        <div style={{ marginTop: "5%" }} className="col-12 text-center">
          <form onSubmit={handelSubmit}>
            <div className="center-content">
              <div className="form-group">
                <label htmlFor="question" className="mt-4">Add Question</label>
                <input
                  className="questionInput mt-4"
                  type="text"
                  id="question"
                  placeholder="Please Enter Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="optionInput"
                  type="text"
                  placeholder="Option 1"
                  value={option1}
                  onChange={(e) => setoption1(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="optionInput"
                  type="text"
                  placeholder="Option 2"
                  value={option2}
                  onChange={(e) => setoption2(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="optionInput"
                  type="text"
                  placeholder="Option 3"
                  value={option3}
                  onChange={(e) => setoption3(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="optionInput"
                  type="text"
                  placeholder="Option 4"
                  value={option4}
                  onChange={(e) => setoption4(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button className="btn btn-success">Save</button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}

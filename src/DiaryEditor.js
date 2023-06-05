import { useState, useRef } from "react";

const DiaryEditor = ({ onCreate }) => {
  // 1-1. 현재 화면의 초기 값을 저장하는 State를 초기화
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 3,
  });

  // 1-2. 현재 화면의 컴포넌트를 가리키는 ref 값을 초기화 (HTML DOM에 접근 가능토록 함)
  const authorInput = useRef();
  const contentInput = useRef();

  // 2. function
  function handleChangeState(e) {
    setState({
      ...state, // author : state.author, content : state.content...
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공!");

    // 저장 후 입력 칸 초기화
    setState({ author: "", content: "", emotion: 3 });
  }

  // 3. 그려지는 화면의 컴포넌트
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author"
          ref={authorInput}
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          name="content"
          ref={contentInput}
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        오늘의 감정점수 :
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;

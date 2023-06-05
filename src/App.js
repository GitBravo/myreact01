import { useState, useRef } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";

function App() {
  // 1-1. 현재 화면의 초기 값을 저장하는 State를 초기화
  const [data, setData] = useState([]);

  // 1-2. 현재 화면의 컴포넌트를 가리키는 ref 값을 초기화 (HTML DOM에 접근 가능토록 함)
  const dataId = useRef(1);

  // 2. function
  function onCreate(author, content, emotion) {
    const createdDate = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      createdDate,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]); // 최신 데이터가 앞에 오도록 설계
  }

  function onRemove(targetId) {
    console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  }

  function onEdit(targetId, newContent) {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }

  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onRemove={onRemove} onEdit={onEdit} diaryList={data} />
    </div>
  );
}

export default App;

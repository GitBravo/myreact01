import { useState, useRef, useEffect } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  // 1-1. 현재 화면의 초기 값을 저장하는 State를 초기화
  const [data, setData] = useState([]);

  // 1-2. 현재 화면의 컴포넌트를 가리키는 ref 값을 초기화 (HTML DOM에 접근 가능토록 함)
  const dataId = useRef(1);

  // 1-3. 컴포넌트가 Mount 되는 시점에 실행되는 useEffect 초기화
  useEffect(() => {
    getData();
  }, []);

  // 2. function
  async function getData() {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        createdDate: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  }

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
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onRemove={onRemove} onEdit={onEdit} diaryList={data} />
    </div>
  );
}

export default App;

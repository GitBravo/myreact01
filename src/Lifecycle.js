import React, { useEffect, useState } from "react";

function Lifecycle() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // 컴포넌트의 마운트 시점에 동작
  useEffect(() => {
    console.log("Mount!");
  }, []);

  // 컴포넌트의 업데이트 시점에 동작
  useEffect(() => {
    console.log("Update!");
  });

  // 컴포넌트의 언마운트 시점에 동작

  useEffect(() => {
    console.log(`count is update : ${count}`);
  }, [count]); // count의 변화가 감지되면 수행

  useEffect(() => {
    console.log(`text is update : ${text}`);
  }, [text]); // text의 변화가 감지되면 수행

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
}

export default Lifecycle;

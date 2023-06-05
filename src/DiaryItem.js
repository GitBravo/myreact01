import { useState, useRef } from "react";

const DiaryItem = ({
  onRemove,
  onEdit,
  id,
  author,
  content,
  emotion,
  createdDate,
}) => {
  // 1-1. 현재 화면의 초기 값을 저장하는 State를 초기화
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);

  // 1-2. 현재 화면의 컴포넌트를 가리키는 ref 값을 초기화 (HTML DOM에 접근 가능토록 함)
  const localContentInput = useRef();

  // 2. function
  function toggleIsEdit() {
    setIsEdit(!isEdit);
  }

  function handleRemove() {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  }

  function handleQuitEdit() {
    setIsEdit(false);
    setLocalContent(content);
  }

  function handleEdit() {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  }

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(createdDate).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            value={localContent}
            ref={localContentInput}
            onChange={(e) => setLocalContent(e.target.value)}
          />
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;

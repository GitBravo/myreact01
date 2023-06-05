import DiaryItem from "./DiaryItem";

const DiaryList = ({ onRemove, onEdit, diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onRemove={onRemove} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

// DiaryList의 기본 dafault props 설정
// (listData가 undefined 가 넘어올 경우 오류 발생 대비)
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

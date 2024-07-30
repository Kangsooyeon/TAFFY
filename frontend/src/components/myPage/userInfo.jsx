import '../../styles/myPage/userInfo.css'

const UseInfo = () => {
  return (
    <div className="userinfobox">
      <div className="characterphoto">
        <p>사진</p>
      </div>
      <div className="characterinfomation">
        <p>닉네임</p>
        <p>띠이름</p>
        <p>띠사진</p>
      </div>
      <div className="poomsaeeducation">
        <p>연습 진행사항</p>
      </div>
      <div className="winpoint">
        <p>승률</p>
      </div>
      <button>수정</button>
    </div>
  )
}

export default UseInfo
import '../../styles/myPage/userUpdatePage.css'
import React, { useState } from 'react'
import Bear from '../../assets/images/myPage/곰 머리.png'
import Dragon from '../../assets/images/myPage/용 머리.png'
import Tiger from '../../assets/images/myPage/호랑이 머리.png'

const UserUpdatePage = ({closeUpdate}) => {
  const [inputValue, setInputValue] = useState('');

  const handleNickNameChange = (e) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue('');
  };

  const handleSubmit = () => {
    // Handle submit action
    alert(`Submitted: ${inputValue}`);
  };

  const [selectedCharacter, setSelectedCharacter] = useState('character1');

  const handleChange = (e) => {
    setSelectedCharacter(e.target.value);
  };


  return (
    <div className="updatepage">

      <button className="updateclosebutton" onClick={closeUpdate}>X</button>
      <div className="input-container">
        <div className="input-wrapper">
          <label className="input-label">닉네임</label>
          <input
            type="text"
            value={inputValue}
            onChange={handleNickNameChange}
            className="input-field"
          />
          {inputValue && <button className="clear-btn" onClick={clearInput}>&times;</button>}
        </div>
        <button className="submit-btn" onClick={handleSubmit}>중복확인</button>
      </div>
      <div className="character-label">캐릭터 선택</div>
      <div className="character-selection-container">
        <div className="character-options">
          {[
            { id: 'character1', img: Tiger },
            { id: 'character2', img: Bear },
            { id: 'character3', img: Dragon },
          ].map((character) => (
            <div key={character.id} className="character-option">
              <img src={character.img} alt={character.id} className="character-image" />
              <input
                type="radio"
                id={character.id}
                name="character"
                value={character.id}
                checked={selectedCharacter === character.id}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="nationcontainer">
        <label className="nationlabel">국가 선택</label>
        <select className="nationselect">
          <option value="1">한국</option>
          <option value="2">미국</option>
          <option value="3">호주</option>
          <option value="3">영국</option>
          <option value="3">뉴질랜드</option>
        </select>
      </div>
      <button className="userdeletebutton">회원 탈퇴</button>
      <button className="updatesavebutton">저장</button>
    </div>
  )
}

export default UserUpdatePage;
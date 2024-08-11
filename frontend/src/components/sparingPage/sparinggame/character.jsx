import '../../../styles/sparingPage/sparinggame/character.css';
import Bear_attack_fail from '../../../assets/images/sparingPage/bear/곰 공격실패.png';
import Bear_basic_1 from '../../../assets/images/sparingPage/bear/곰 기본동작 1.png';
import Bear_basic_2 from '../../../assets/images/sparingPage/bear/곰 기본동작 2.png';
import Bear_basic_3 from '../../../assets/images/sparingPage/bear/곰 기본동작 3.png';
import Bear_depence from '../../../assets/images/sparingPage/bear/곰 막기.png';
import Bear_leg_1 from '../../../assets/images/sparingPage/bear/곰 발차기 1.png';
import Bear_leg_2 from '../../../assets/images/sparingPage/bear/곰 발차기 2.png';
import Bear_punch from '../../../assets/images/sparingPage/bear/곰 지르기.png';
import Bear_fail from '../../../assets/images/sparingPage/bear/곰 피해.png';
import Tiger_attack_fail from '../../../assets/images/sparingPage/tiger/호랑이 공격실패.png';
import Tiger_basic_1 from '../../../assets/images/sparingPage/tiger/호랑이 기본동작 1.png';
import Tiger_basic_2 from '../../../assets/images/sparingPage/tiger/호랑이 기본동작 2.png';
import Tiger_basic_3 from '../../../assets/images/sparingPage/tiger/호랑이 기본동작 3.png';
import Tiger_depence from '../../../assets/images/sparingPage/tiger/호랑이 막기.png';
import Tiger_leg_1 from '../../../assets/images/sparingPage/tiger/호랑이 발차기 1.png';
import Tiger_leg_2 from '../../../assets/images/sparingPage/tiger/호랑이 발차기 2.png';
import Tiger_punch from '../../../assets/images/sparingPage/tiger/호랑이 지르기.png';
import Tiger_fail from '../../../assets/images/sparingPage/tiger/호랑이 피해.png';
import Dragon_attack_fail from '../../../assets/images/sparingPage/dragon/용 공격실패.png';
import Dragon_basic_1 from '../../../assets/images/sparingPage/dragon/용 기본동작 1.png';
import Dragon_basic_2 from '../../../assets/images/sparingPage/dragon/용 기본동작 2.png';
import Dragon_basic_3 from '../../../assets/images/sparingPage/dragon/용 기본동작 3.png';
import Dragon_depence from '../../../assets/images/sparingPage/dragon/용 막기.png';
import Dragon_leg_1 from '../../../assets/images/sparingPage/dragon/용 발차기 1.png';
import Dragon_leg_2 from '../../../assets/images/sparingPage/dragon/용 발차기 2.png';
import Dragon_punch from '../../../assets/images/sparingPage/dragon/용 지르기.png';
import Dragon_fail from '../../../assets/images/sparingPage/dragon/용 피해.png';
import { useState, useEffect } from 'react';

const characterImages = {
  Bear: {
    basic: [Bear_basic_1, Bear_basic_2, Bear_basic_3],
    attack_fail: Bear_attack_fail,
    defense: Bear_depence,
    leg: [Bear_leg_1, Bear_leg_2],
    punch: Bear_punch,
    fail: Bear_fail,
  },
  Tiger: {
    basic: [Tiger_basic_1, Tiger_basic_2, Tiger_basic_3],
    attack_fail: Tiger_attack_fail,
    defense: Tiger_depence,
    leg: [Tiger_leg_1, Tiger_leg_2],
    punch: Tiger_punch,
    fail: Tiger_fail,
  },
  Dragon: {
    basic: [Dragon_basic_1, Dragon_basic_2, Dragon_basic_3],
    attack_fail: Dragon_attack_fail,
    defense: Dragon_depence,
    leg: [Dragon_leg_1, Dragon_leg_2],
    punch: Dragon_punch,
    fail: Dragon_fail,
  },
};

const Character = ({ className, userdata, action }) => {
  // console.log(userdata)
  const avatar = userdata.data.avatar;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAction, setCurrentAction] = useState('basic');

  useEffect(() => {
    if (action) {
      setCurrentAction(action);
      const timeout = setTimeout(() => {
        setCurrentAction('basic');
      }, 5000); // 5초 후에 기본 동작으로 돌아감

      return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 타임아웃 정리
    }
  }, [action]);

  useEffect(() => {
    if (Array.isArray(characterImages[avatar][currentAction])) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % characterImages[avatar][currentAction].length);
      }, 500); // 500ms마다 이미지 변경

      return () => clearInterval(interval);
    } else {
      setCurrentIndex(0); // 단일 이미지의 경우 인덱스를 0으로 설정
    }
  }, [avatar, currentAction]);

  const characterImage = Array.isArray(characterImages[avatar][currentAction])
    ? characterImages[avatar][currentAction][currentIndex]
    : characterImages[avatar][currentAction];

  return (
    <div className={`character-box ${className}`}>
      <img src={characterImage} alt="Character" />
    </div>
  );
};

export default Character;

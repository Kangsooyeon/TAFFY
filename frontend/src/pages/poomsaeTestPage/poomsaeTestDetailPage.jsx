import { useEffect } from 'react';

const PoomsaeTestDetailPage = () => {
  useEffect(() => {
    const audio = new Audio('src/assets/sounds/poomsaeTestPage/attention.mp3');
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });

    // 오디오를 클린업으로 정리
    return () => {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  return (
    <div>
      <h1>포함사 테스트 상세 페이지</h1>
      <p>여기에 상세 내용을 작성하십시오.</p>
    </div>
  );
};

export default PoomsaeTestDetailPage;
import { useState, useEffect } from 'react';
import '../../../styles/sparingPage/sparingresult/vicRateAfter.css';
import upSign from '../../../assets/images/sparingPage/상승아이콘.png'
import downSign from '../../../assets/images/sparingPage/하강아이콘.png'


const VicRateAfter = ({ className, oldData, newData, result, language }) => {
  const [displayRate, setDisplayRate] = useState(oldData.data.totalMatches > 0 ? ((oldData.data.win / oldData.data.totalMatches) * 100).toFixed(1) : '0.0');
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    const newWinRate = (newData.data.draw + newData.data.lose + newData.data.win) > 0 ? ((newData.data.win / (newData.data.draw + newData.data.lose + newData.data.win)) * 100).toFixed(1) : '0.0';

    const showOldRateDuration = 2000; // Show old rate for 2 seconds
    const fadeDuration = 500; // Fade-out and fade-in duration

    const showOldRateTimeout = setTimeout(() => {
      setFadeClass('fade-out');

      const fadeTimeout = setTimeout(() => {
        setDisplayRate(newWinRate);
        setFadeClass('fade-in');
      }, fadeDuration); // Transition duration matches the CSS

      return () => clearTimeout(fadeTimeout);
    }, showOldRateDuration);

    return () => clearTimeout(showOldRateTimeout);
  }, [newData]);

  return (
    <div className={`vicrateafterbox ${className}`}>
      <h2 style={{ margin: '2%' }}>{language === 'ko' ? '승률' : 'WP'}</h2>
      <hr className="afterhr" />
      <div className="scorebox">
        <p className={fadeClass}>{displayRate}%</p>
        { result === 'win' ?
          <img src={upSign} className="resultsign"alt=""/> :
          <img src={downSign} className="resultsign" alt=""/>
        }
      </div>
    </div>
  );
};

export default VicRateAfter;

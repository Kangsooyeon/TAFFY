import '../../../styles/sparingPage/sparinggame/mission.css';
import AttackMe from '../../../assets/images/sparingPage/attack-me.png';
import AttackYou from '../../../assets/images/sparingPage/attack-you.png';

const Mission = ({ myMission, opponentMission, language }) => {
  return (
    <div className="missionbox">
      <div>
        <img src={AttackMe} className="missionboxme" alt="" />
        <p className="missionmename">{language === 'ko' ? myMission.moKoName : myMission.mvEnName}</p>
        <div className="missionme">
          <p>ME</p>
        </div>
      </div>
      <div>
        <img src={AttackYou} className="missionboxyou" alt="" />
        <p className="missionyouname">{language === 'ko' ? opponentMission.moKoName : opponentMission.mvEnName}</p>
        <div className="missionyou">
          <p>YOU</p>
        </div>
      </div>
    </div>
  );
};

export default Mission;

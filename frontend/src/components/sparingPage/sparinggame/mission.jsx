import '../../../styles/sparingPage/sparinggame/mission.css';
import AttackMe from '../../../assets/images/sparingPage/attack-me.png';
import AttackYou from '../../../assets/images/sparingPage/attack-you.png';

const Mission = ({ myMission, opponentMission }) => {
  return (
    <div className="missionbox">
      <div>
        <img src={AttackMe} className="missionboxme" alt="" />
        <p className="missionmename">{myMission}</p>
        <div className="missionme">
          <p>ME</p>
        </div>
      </div>
      <div>
        <img src={AttackYou} className="missionboxyou" alt="" />
        <p className="missionyouname">{opponentMission}</p>
        <div className="missionyou">
          <p>YOU</p>
        </div>
      </div>
    </div>
  );
};

export default Mission;

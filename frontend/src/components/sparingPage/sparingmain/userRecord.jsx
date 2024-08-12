import '../../../styles/sparingPage/sparingmain/userRecord.css'
import SparInfoBottom from '../../../assets/images/sparingPage/spar-info-bottom.png'
import SparInfoTop from '../../../assets/images/sparingPage/spar-info-top.png'


const userRecord = ({userdata, language}) => {
  const winRate = (userdata.data.totalMatches) === 0 
  ? 0 
  : (userdata.data.win / (userdata.data.totalMatches)) * 100;
  return (
    <div className="recordbox">
      <div>
        <img src={SparInfoTop} alt="" className="recordimgtop"/>
      </div>
      <div className="countbox">
        <div className="countdiv">
          <div className="totalcount">
            <p className="custom-title">{language === 'ko' ? '총 횟수' : 'total times'}</p>
            <hr className="custom-hr"/>
            <p style={{fontSize: '50px', margin: '0px'}}>{userdata.data.totalMatches}<span style={{fontSize: '20px'}}>{language === 'ko' ? '회' : 'T'}</span></p>
          </div>
          <div className="wincount">
            <p className="custom-title">{language == 'ko' ? '이긴 횟수' : 'number of wins'}</p>
            <hr className="custom-hr"/>
            <p style={{fontSize: '50px', margin: '0px'}}>{userdata.data.win}<span style={{fontSize: '20px'}}>{language === 'ko' ? '회' : 'T'}</span></p>
          </div>
        </div>
        <div className="winscore">
          <p className="custom-title">{language === 'ko' ? '승률' : 'WP' }</p>
          <hr className="custom-hr"/>
          <p style={{fontSize: '50px', margin: '0px'}}>{isNaN(winRate) ? 0 : winRate.toFixed(1)}<span style={{fontSize: '20px'}}>%</span></p>
          </div>
      </div>
      <div style={{margin: '-4px', width: '99%'}}>
        <img src={SparInfoBottom} alt="" className="recordimgbottom"/>
      </div>
    </div>
  )
}

export default userRecord;
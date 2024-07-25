import '../../../styles/sparingPage/sparingmain/userRecord.css'
import SparInfoBottom from '../../../assets/images/sparingPage/spar-info-bottom.png'
import SparInfoTop from '../../../assets/images/sparingPage/spar-info-top.png'


const userRecord = () => {
  return (
    <div className="recordbox">
      <div>
        <img src={SparInfoTop} alt="" className="recordimgtop"/>
      </div>
      <div className="countbox">
        <div className="countdiv">
          <div className="totalcount">
            <p>총횟수</p>
            <hr />
            <p>20회</p>
          </div>
          <div className="wincount">
            <p>이긴횟수</p>
            <hr />
            <p>10회</p>
          </div>
        </div>
        <div className="winscore">
          <p>승률</p>
          <hr />
          <p>50%</p>
        </div>
      </div>
      <div style={{margin: '-4px', width: '99%'}}>
        <img src={SparInfoBottom} alt="" className="recordimgbottom"/>
      </div>
    </div>
  )
}

export default userRecord;
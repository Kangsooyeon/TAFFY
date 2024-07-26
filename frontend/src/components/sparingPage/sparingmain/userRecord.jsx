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
            <p className="custom-title">총 횟수</p>
            <hr className="custom-hr"/>
            <p style={{fontSize: '50px', margin: '0px'}}>20<span style={{fontSize: '20px'}}>회</span></p>
          </div>
          <div className="wincount">
            <p className="custom-title">이긴 횟수</p>
            <hr className="custom-hr"/>
            <p style={{fontSize: '50px', margin: '0px'}}>10<span style={{fontSize: '20px'}}>회</span></p>
          </div>
        </div>
        <div className="winscore">
          <p className="custom-title">승률</p>
          <hr className="custom-hr"/>
          <p style={{fontSize: '50px', margin: '0px'}}>50<span style={{fontSize: '20px'}}>%</span></p>
          </div>
      </div>
      <div style={{margin: '-4px', width: '99%'}}>
        <img src={SparInfoBottom} alt="" className="recordimgbottom"/>
      </div>
    </div>
  )
}

export default userRecord;
import '../../../styles/sparingPage/sparingresult/vicRateAfter.css'

const VicRateAfter = ({className, userdata}) => {
  const { win, totalMatches } = userdata.data;
  const winRate = totalMatches > 0 ? ((win / totalMatches) * 100).toFixed(1) : '0.0';
  console.log(userdata)
  return (
    <div className={`vicrateafterbox ${className}`}>
      <p style={{margin: '2%'}}>승률</p>
      <hr className="afterhr"/>
      <p>{winRate}%</p>
    </div>
  )
}

export default VicRateAfter;
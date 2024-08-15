import '../../../styles/sparingPage/sparinggame/hpBar.css'

const HpBar = ({className, hp}) => {
  return (
    <div className={`guagebarbox ${className}`}>
      <div className="gaugebar"  style={{ width: `${hp}%` }}>
      </div>
    </div>
  )
}

export default HpBar;
import '../../../styles/sparingPage/sparinggame/webCam.css'
import CamTop from '../../../assets/images/sparingPage/webcam-top.png'

const WebCam = ({className}) => {
  return (
    <div className={`webcambox ${className}`}>
      <img src={CamTop} className="camtop" alt="" />
      <section className="cam">
        <p>캠</p>
      </section>
    </div>
  )
}

export default WebCam;
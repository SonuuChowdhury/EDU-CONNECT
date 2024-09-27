import { useNavigate } from 'react-router-dom'
import './basicNavbar.css'

export default function BasicNavbar() {
  const navigate=useNavigate();
  const HomeHandeller=()=>{
    navigate('/')
  }
  return<>
    <nav className="navbarTop">

        <div className="leftArea" onClick={HomeHandeller}>
          <div className="collegeLogo"></div>
          <div className="nameArea">
            <span className="nameAreaEng">ACADEMY OF TECHNOLOGY</span>
            <span className="nameAreaHin">प्रौद्योगिकी अकादमी</span>
          </div>
        </div>

        <div className="rightArea">
        <div className="extraLogo1"></div>
        <div className="extraLogo2"></div>
        </div>
    </nav>
    <div className="BasicNavBootomborder"></div>
  </>
}

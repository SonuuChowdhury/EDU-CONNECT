
import "./headNav.css";

export default function HeadNav() {
  return<>
    <nav className="navbarTop">

        <div className="leftArea">
          <div className="collegeLogo"></div>
          <div className="nameArea">
            <span className="nameAreaEng">ACADEMY OF TECHNOLOGY</span>
            <span className="nameAreaHin">प्रौद्योगिकी अकादमी</span>
          </div>
        </div>

        <div className="rightArea">
        <div className="SearchAndLangSec">
          <select className="LanguageSelector">
            <option value="ENG">English</option>
            <option value="HIN">Hindi</option>
            <option value="BNG">Bengali</option>
          </select>
          <input type="text" placeholder="🔍 Search Anything Here" className="mainSearchBar"/>
        </div>
        <div className="extraLogo1"></div>
        <div className="extraLogo2"></div>
        </div>
        
        

    </nav>
  </>
}

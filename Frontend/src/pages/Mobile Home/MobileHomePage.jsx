import './MobileHomePage.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MobileHomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const isDesktop = screenWidth > 768;
      if (isDesktop) {
        navigate('/');
      }
    };

    window.addEventListener('resize', handleResize);

    // Check on mount in case already on desktop
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  return (
    <div className="MobileHomePage___container">
      <header className="MobileHomePage___header">
        <h1 className="MobileHomePage___title">Welcome to Institute Portal</h1>
        <p className="MobileHomePage___subtitle">Simplifying Institute Access – On The Go</p>
      </header>

      <main className="MobileHomePage___main">
        <div className="MobileHomePage___card MobileHomePage___highlight">
          <h3 className="MobileHomePage___highlightTitle">Want full features?</h3>
          <p className="MobileHomePage___highlightText">
            Some advanced features are available on Desktop only.
          </p>
          <p className="MobileHomePage___highlightNote">
            Please switch desktop mode if you are using a phone or switch to a desktop browser for best experience.
          </p>
        </div>

        <div className="MobileHomePage___card">
          <h2 className="MobileHomePage___sectionTitle">Features</h2>
          <ul className="MobileHomePage___featureList">
            <li>📊 Student Dashboard</li>
            <li>📅 Attendance Management</li>
            <li>📁 Access Academic Resources</li>
            <li>📬 Notifications & Alerts</li>
          </ul>
        </div>
      </main>

      <footer className="MobileHomePage___footer">
        <p className="MobileHomePage___footerText">© 2024 AOT Institute Portal</p>
      </footer>
    </div>
  );
}

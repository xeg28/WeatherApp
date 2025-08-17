import './Info.css'
import { useState } from 'react';
function Info() {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="info">
      <button className='info-btn' onClick={() => setShowInfo(!showInfo)} title='Info'>
        <img src="./svg/info.svg" alt="info" />
      </button>
      {showInfo &&
        (<div className="info-text" onClick={() => setShowInfo(false)}>
          <span id="name">Emmanuel Gonzalez<br/></span>
          The Product Manager Accelerator Program is designed to support PM professionals 
          through every stage of their careers. From students looking for entry-level jobs to Directors 
          looking to take on a leadership role, our program has helped over hundreds of students fulfill 
          their career aspirations. <br/><br/>

          Our Product Manager Accelerator community are ambitious and committed. 
          Through our program they have learnt, honed and developed new PM and leadership skills, 
          giving them a strong foundation for their future endeavors.
        </div>)
      }
    </div>
  );
}

export default Info;
import React from 'react';
import FunctionalCompnav from './hader/navbar';
import FunctionalCompsearch from './hader/search';
import FunctionalCompuserlogo from './hader/userlogo';
import './hadercss/nav.css';

function FunctionalComp() {
 
  return (
    <div style={{ backgroundColor: 'red' }}>
      <div class="navbar">
      <FunctionalCompnav/>
      </div>
     
     <div class ="topic">
     <h1>hader</h1>
     </div>
    
     <FunctionalCompuserlogo/>
    </div>
  );
}

export default FunctionalComp;

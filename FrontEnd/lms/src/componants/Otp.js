import React, { useState } from "react";
import FunctionalComHead from './header/header';
import FunctionalComFooter from './footer/footer';
import './css/Otp.css';

function FunctionalComLogin() {
  const [otp, setOtp] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The OTP you entered was: ${otp}`);
  }

  return (
    <div className="otp-card-container">
      <FunctionalComHead />
      <div className="otp-content-wrap">
        <div className="otp-login-form">
          <form onSubmit={handleSubmit}>
            <div className="otp-form-page">
              <p className="otp-instructions">To reset your password, enter the OTP sent to your registered email.</p>
              <h1 className="otp-heading">OTP Verification</h1>
              
              <div className="otp-labels">
                <label>OTP:</label>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter your OTP..."
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
             
              <div className="btn">
                <input className="submit" type="submit" value="Submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <FunctionalComFooter />
    </div>
  );
}

export default FunctionalComLogin;
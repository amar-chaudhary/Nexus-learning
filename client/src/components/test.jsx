import React, { useState } from "react";
import axios from "axios";

function EmailVerification() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const sendOTP = () => {
    axios.post("/api/sendOTP", { email: email }).then((response) => {
      if (response.data.success) {
        setVerificationMessage(response.data.message);
      }
    });
  };

  const verifyOTP = () => {
    axios.post("/api/verifyOTP", { email: email, otp: otp }).then((response) => {
      if (response.data.success) {
        setVerificationMessage(response.data.message);
      }
    });
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <button onClick={sendOTP}>Send OTP</button>
      <br />
      <label>
        OTP:
        <input type="text" value={otp} onChange={handleOTPChange} />
      </label>
      <br />
      <button onClick={verifyOTP}>Verify OTP</button>
      <br />
      <div>{verificationMessage}</div>
    </div>
  );
}

export default EmailVerification;
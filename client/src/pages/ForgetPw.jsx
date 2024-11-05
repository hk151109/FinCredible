import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ForgetPwPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const notifySuccess = (message) => {
    toast.success(message);
  };

  const notifyError = (error) => {
    toast.error(error.message || "An error occurred");
  };

  const notifyLoading = () => {
    toast.info("Sending verification link...");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      notifyError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    notifyLoading();
    try {
      const response = await axios.post(
        "http://localhost:8080/password/forgot-password",
        { email }
      );
      setMessage(response.data.message);
      notifySuccess(response.data.message);
    } catch (error) {
      console.error("Forgot password error:", error);
      notifyError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenInbox = () => {
    const emailProviderUrl = "https://gmail.com/";
    window.open(emailProviderUrl, "_blank");
  };

  const handleGoToLogin = () => {
    window.location.href = "/";
  };

  return (
    <>
      <ToastContainer />
      <div className="LoginPage">
        <Container className="LoginPageContainer">
          <Row className="PwPageContainer">
            <Col md={12}>
              <div className="PwPage">
                <h1>Forgot Password</h1>
                <p>
                  Enter your email address and we'll send you instructions on
                  how to reset your password
                </p>
                <form className="form-pw" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Verification Link"}
                  </button>
                </form>
                {message && (
                  <div className="ResponseDiv">
                    <p>{message}</p>
                    <div className="ResponseDivButton">
                      <button onClick={handleOpenInbox}>Open Gmail</button>
                      <button onClick={handleGoToLogin}>Back to Login</button>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ForgetPwPage;

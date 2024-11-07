import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Accounts() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/auth/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      setUser(null);
      notifySuccess("Successfully logged out.");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000); // Give time for toast to show before redirect
    } catch (error) {
      console.error("Error logging out:", error);
      notifyError("Failed to log out. Please try again.");
    }
  };

  const fetchUser = async () => {
    const cachedUser = localStorage.getItem("user");

    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      setLoading(false);
    } else {
      try {
        const response = await axios.get("http://localhost:8080/api/user/profile/", {
          withCredentials: true,
        });
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        console.error("Error fetching user data:", error);
        notifyError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <ToastContainer />
      <Container className="HomePageContainer ProfileContainer" style={styles.container}>
        {loading ? (
          <div style={styles.loader}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : user ? (
          <>
            <Row>
              <Col md={12} style={styles.header}>
                <h1>Welcome to FinCredible</h1>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h2 style={styles.sectionHeader}>Profile</h2>
                <div style={styles.profileInfo}>
                  <img src={user.profilePicture} alt="Profile" style={styles.profileImage} />
                  <div style={styles.profileDetails}>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                  </div>
                </div>
                <Button variant="danger" onClick={handleLogout} style={styles.logoutButton}>
                  Logout
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col md={12} style={styles.header}>
              <h1>Logging out...</h1>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

const styles = {
  container: {
    marginTop: "50px",
    maxWidth: "600px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  sectionHeader: {
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },
  profileInfo: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "20px",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "15px",
    objectFit: "cover",
  },
  profileDetails: {
    textAlign: "center",
  },
  logoutButton: {
    display: "block",
    width: "100%",
    marginTop: "20px",
  },
};

export default Accounts;

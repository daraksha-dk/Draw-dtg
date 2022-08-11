import React, { Fragment } from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import logo from "../../images/Logo.svg";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";

const NavBar = ({ authReducer: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="nav justify-content-end">
        <Nav.Link href="/artboard">
          <i className="fas fa-solid fa-pen"></i>
          &nbsp;Artboard
        </Nav.Link>
        <Nav.Link onClick={logout}>
          <i className="fas fa-sign-out-alt" /> Logout
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  );

  const guestLinks = (
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="nav  justify-content-end">
        <Nav.Link href="/artboard">
          <i className="fas fa-solid fa-pen"></i>
          &nbsp;Artboard
        </Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  );

  return (
    <Navbar
      className="pl-5 nav-bar"
      sticky="top"
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
    >
      <Navbar.Brand href="/">
        <Image src={logo} width="40px" height="40px" className="mr-2" />
        Design
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Navbar>
  );
};

// Navbar.propTypes = {
//   logout: PropTypes.func.isRequired,
//   authReducer: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { logout })(NavBar);

import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="head">Designing Application</h1>
          <p className="lead">Use this platform to draw a Design .</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-signup">
              Register
            </Link>
            <Link to="/login" className="btn btn-login">
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);

import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { signup } from "../../actions/auth";
import PropTypes from "prop-types";
import { TextField, Typography, Button } from "@material-ui/core";

const Signup = ({ setAlert, signup, isAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    length: true
  });
  const { name, email, password, password2, length } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "warning");
    } else {
      setFormData({
        ...formData,
        length: password.length > 5 ? true : false
      });
      signup({ name, email, password });
    }
  };

  //Redirect after user validation
  if (typeof isAuth !== "undefined" && isAuth) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Typography color='inherit' variant='h4'>
        Sign Up
      </Typography>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <TextField
          label='Name'
          name='name'
          value={name}
          onChange={e => onChange(e)}
          required
        />
        <br />
        <TextField
          label='Email Address'
          name='email'
          value={email}
          onChange={e => onChange(e)}
          required
        />
        <br />
        <TextField
          label='Password'
          name='password'
          type='password'
          value={password}
          onChange={e => onChange(e)}
          error={!length}
          required
        />
        <br />
        <TextField
          label='Confirm Password'
          name='password2'
          type='password'
          value={password2}
          onChange={e => onChange(e)}
          required
        />
        <br />
        <br />
        <Button type='submit' variant='contained' color='primary'>
          Sign Up
        </Button>
      </form>
      <p>
        Already have an account? <Link to='/signin'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { setAlert, signup })(Signup);

import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signin } from "../../actions/auth";
import { TextField, Typography, Button } from "@material-ui/core";
// note: use themeprovider later to handle light/dark mode

const Signin = ({ signin, isAuth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    length: true
  });
  const { email, password, length, noInput } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    setFormData({
      ...formData,
      length: password.length > 5 ? true : false
    });
    signin(email, password);
  };

  //Redirect after user validation
  if (typeof isAuth !== "undefined" && isAuth) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Typography color='inherit' variant='h4'>
        Sign In
      </Typography>
      <form className='form' onSubmit={e => onSubmit(e)}>
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
        <br />
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
      <p>
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Signin.propTypes = {
  signin: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { signin })(Signin);

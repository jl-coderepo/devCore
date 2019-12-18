import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@material-ui/core";

const Landing = () => {
  return (
    <section className='landing'>
      <div className='landing-content'>
        <h1>Dev Core</h1>
        <p>Where developers come to collaborate.</p>
        <ButtonGroup
          color='primary'
          variant='contained'
          size='large'
          aria-label='large outlined secondary button group'
        >
          <Button>
            <Link to='signup' className='react-link'>
              Sign Up
            </Link>
          </Button>
          <Button>
            <Link to='signin' className='react-link'>
              Sign In
            </Link>
          </Button>
        </ButtonGroup>
        <div>
          {/* <Link to='/register'>Sign Up</Link>
            <Link to='/login'>Login</Link> */}
        </div>
      </div>
    </section>
  );
};

export default Landing;

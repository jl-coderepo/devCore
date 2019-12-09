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
          <Button>Sign Up</Button>
          <Button>Sign In</Button>
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

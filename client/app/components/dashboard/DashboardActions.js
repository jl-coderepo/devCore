import React, { Fragment } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <Fragment>
      <ButtonGroup
        color='primary'
        variant='contained'
        size='small'
        aria-label='large outlined secondary button group'
      >
        <Button variant='contained' color='primary' size='small'>
          <Link
            to='/profile/me'
            className='react-link'
            color='inherit'
            underline='none'
          >
            My Profile
          </Link>
        </Button>
        <Button variant='contained' color='primary' size='small'>
          <Link
            to='/editprofile'
            className='react-link'
            color='inherit'
            underline='none'
          >
            Edit Profile
          </Link>
        </Button>
        <Button variant='contained' color='primary' size='small'>
          <Link
            to='/addeducation'
            className='react-link'
            color='inherit'
            underline='none'
          >
            Add Education
          </Link>
        </Button>
        <Button variant='contained' color='primary' size='small'>
          <Link
            to='/addexperience'
            className='react-link'
            color='inherit'
            underline='none'
          >
            Add Experience
          </Link>
        </Button>
      </ButtonGroup>
    </Fragment>
  );
};

export default DashboardActions;

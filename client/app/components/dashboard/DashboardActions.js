import React, { Fragment } from "react";
import { Button, ButtonGroup } from "@material-ui/core";

const DashboardActions = () => {
  return (
    <Fragment>
      <ButtonGroup
        color='primary'
        variant='contained'
        size='small'
        aria-label='large outlined secondary button group'
      >
        <Button
          href='/editprofile'
          variant='contained'
          color='primary'
          size='small'
        >
          Edit Profile
        </Button>
        <Button
          href='/addeducation'
          variant='contained'
          color='primary'
          size='small'
        >
          Add Education
        </Button>
        <Button
          href='/addexperience'
          variant='contained'
          color='primary'
          size='small'
        >
          Add Experience
        </Button>
      </ButtonGroup>
    </Fragment>
  );
};

export default DashboardActions;

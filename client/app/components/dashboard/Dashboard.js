import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import {
  CircularProgress,
  Typography,
  Modal,
  makeStyles,
  Button,
  Grid,
  ButtonGroup
} from "@material-ui/core";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  // return <CircularProgress />;
  return loading && profile === null ? (
    <CircularProgress />
  ) : (
    <Fragment>
      <Typography color='inherit' variant='h4'>
        Dashboard
      </Typography>
      <Typography color='inherit' variant='h6'>
        Welcome {user && user.name}
      </Typography>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <br />
          <br />
          <Experience experience={profile.experience} />
          <br />
          <Education education={profile.education} />
        </Fragment>
      ) : (
        <Fragment>
          <Typography color='inherit' variant='body1'>
            No profile found, please create a profile.
          </Typography>
          <Button
            href='/createprofile'
            variant='contained'
            color='primary'
            size='small'
          >
            Create Profile
          </Button>
        </Fragment>
      )}
      <Grid container justify='flex-end'>
        <div>
          <Button
            color='secondary'
            size='small'
            variant='contained'
            onClick={() => {
              setOpen(true);
            }}
          >
            Delete Account
          </Button>
          <Modal
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2 id='simple-modal-title'>Delete</h2>
              <p id='simple-modal-description'>
                Are you sure you want to permanently delete this account?
              </p>
              <Grid
                container
                justify='center'
                alignContent='space-between'
                spacing={5}
              >
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={e => {
                      e.preventDefault();
                      deleteAccount();
                    }}
                  >
                    Yes
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={e => {
                      e.preventDefault();
                      setOpen(false);
                    }}
                  >
                    No
                  </Button>
                </Grid>
              </Grid>
              {/* <SimpleModal /> */}
            </div>
          </Modal>
        </div>
      </Grid>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);

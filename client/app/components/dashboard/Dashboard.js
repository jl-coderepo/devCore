import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { CircularProgress, Typography, Link, Button } from "@material-ui/core";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
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
        <Fragment>THIS USER HAS A PROFILE</Fragment>
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
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

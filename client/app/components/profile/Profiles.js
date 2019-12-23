import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CircularProgress, Typography, Grid } from "@material-ui/core";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <Fragment>
      {loading ? (
        <CircularProgress />
      ) : (
        <Fragment>
          <Typography color='inherit' variant='h4'>
            Developers
          </Typography>
          <Fragment>
            {profiles.length > 0 ? (
              <Grid container direction='row' justify='space-around'>
                {profiles.map(profile => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))}
              </Grid>
            ) : (
              <Typography color='inherit' variant='subtitle2'>
                No Profiles Found
              </Typography>
            )}
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

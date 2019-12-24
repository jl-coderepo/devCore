import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  CircularProgress,
  Typography,
  Grid,
  Button,
  Paper,
  Link as OutLink
} from "@material-ui/core";
import { getProfileById } from "../../actions/profile";
import Education from "../dashboard/Education";
import Experience from "../dashboard/Experience";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import LanguageIcon from "@material-ui/icons/Language";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
  match,
  profile: { profile, loading },
  auth,
  getProfileById
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, []);
  return (
    <Fragment>
      {profile === null || loading ? (
        <CircularProgress />
      ) : (
        <Fragment>
          <Grid container direction='column' justify='space-around' spacing={2}>
            <Grid item>
              <Paper>
                <Grid container direction='column' alignItems='center'>
                  <Grid item>
                    <Typography color='inherit' variant='h6'>
                      {profile.user.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography color='textSecondary' variant='subtitle2'>
                      {`${profile.status}${
                        profile.company ? ` | ${profile.company}` : ""
                      }${profile.location ? ` | ${profile.location}` : ""}`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {typeof profile.website !== "undefined" &&
                    profile.website !== null &&
                    profile.website ? (
                      <OutLink href={profile.website}>
                        <LanguageIcon color='primary' fontSize='small' />
                      </OutLink>
                    ) : null}
                    {typeof profile.social !== "undefined" &&
                    profile.social !== null &&
                    profile.social.youtube ? (
                      <OutLink href={profile.social.youtube}>
                        <YouTubeIcon color='primary' fontSize='small' />
                      </OutLink>
                    ) : null}
                    {typeof profile.social !== "undefined" &&
                    profile.social !== null &&
                    profile.social.twitter ? (
                      <OutLink href={profile.social.twitter}>
                        <TwitterIcon color='primary' fontSize='small' />
                      </OutLink>
                    ) : null}
                    {typeof profile.social !== "undefined" &&
                    profile.social !== null &&
                    profile.social.facebook ? (
                      <OutLink href={profile.social.facebook}>
                        <FacebookIcon color='primary' fontSize='small' />
                      </OutLink>
                    ) : null}
                    {typeof profile.social !== "undefined" &&
                    profile.social !== null &&
                    profile.social.linkedin ? (
                      <OutLink href={profile.social.linkedin}>
                        <LinkedInIcon color='primary' fontSize='small' />
                      </OutLink>
                    ) : null}
                    {typeof profile.social !== "undefined" &&
                    profile.social !== null &&
                    profile.social.instagram ? (
                      <OutLink href={profile.social.instagram}>
                        <InstagramIcon color='primary' fontSize='small' />
                      </OutLink>
                    ) : null}
                    {typeof profile.githubusername !== "undefined" &&
                    profile.githubusername !== null &&
                    profile.githubusername.length > 0 ? (
                      <OutLink
                        href={`https://github.com/${profile.githubusername}/`}
                      >
                        <GitHubIcon color='primary' fontSize='small' />
                      </OutLink>
                    ) : null}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Grid
                container
                direction='row'
                justify='space-around'
                spacing={2}
              >
                <Grid item xs={12} sm={6} md={8}>
                  <Paper>
                    <Typography color='inherit' variant='h6'>
                      Bio:
                    </Typography>
                    <Typography color='inherit' variant='body2'>
                      {profile.bio}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper>
                    <Typography color='inherit' variant='h6'>
                      Skills:
                    </Typography>
                    <Grid container direction='row'>
                      {profile.skills.map((skill, i) => (
                        <Grid item key={i} xs={6} sm={4} md={2} lg={1}>
                          <Typography color='inherit' variant='body2'>
                            {skill}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Experience experience={profile.experience} />
            </Grid>
            <Grid item>
              <Grid item>
                <Education education={profile.education} />
              </Grid>
            </Grid>
            {profile.githubusername && (
              <Grid item>
                <ProfileGithub username={profile.githubusername} />
              </Grid>
            )}
          </Grid>
          <Grid container justify='flex-end'>
            {auth.isAuth &&
              !auth.loading &&
              auth.user._id === profile.user._id && (
                <Link
                  to={"/editprofile"}
                  className='react-link'
                  color='inherit'
                  underline='none'
                >
                  <Button size='small' variant='contained' color='primary'>
                    Edit Profile
                  </Button>
                </Link>
              )}
            <Link
              to={"/profiles"}
              className='react-link'
              color='inherit'
              underline='none'
            >
              <Button size='small' variant='contained' color='primary'>
                Go Back To Developers
              </Button>
            </Link>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);

import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardActions,
  makeStyles,
  CardContent,
  Link
} from "@material-ui/core";
import { getGithubRepos } from "../../actions/profile";
import moment from "moment";

const useStyles = makeStyles({
  card: {
    minWidth: 205
  },
  title: {
    fontSize: 18
  },
  pos: {
    marginBottom: 12
  }
});

// const classes = useStyles();

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);
  const classes = useStyles();
  return (
    <Fragment>
      {repos === null ? (
        <CircularProgress />
      ) : (
        <Fragment>
          <Typography color='inherit' variant='h6'>
            {repos.length > 1 ? "Projects" : "Project"}
          </Typography>
          <Grid container spacing={2}>
            {repos.map(repo => (
              <Grid key={repo._id} item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color='inherit'
                      variant='h6'
                    >
                      {repo.name}
                    </Typography>
                    <Typography
                      className={classes.pos}
                      color='textSecondary'
                      variant='subtitle2'
                    >
                      created: {moment.utc(repo.created_at).format("MM/DD/YY")}
                      {repo.updated_at ? (
                        <Fragment>
                          {" | "}
                          updated:{" "}
                          {moment.utc(repo.updated_at).format("MM/DD/YY")}
                        </Fragment>
                      ) : null}
                      {repo.language ? (
                        <Fragment>
                          {" | "}
                          {repo.language}
                        </Fragment>
                      ) : null}
                    </Typography>
                    {repo.description === null ? null : (
                      <Typography color='inherit' variant='body2'>
                        {repo.description}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <Grid container justify='flex-end'>
                      <Link
                        href={`https://github.com/${repo.full_name}`}
                        className='react-link'
                        color='inherit'
                        underline='none'
                        target='_blank'
                      >
                        <Typography
                          className={classes.pos}
                          color='textSecondary'
                          variant='subtitle2'
                        >
                          Go To Repo
                        </Typography>
                      </Link>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);

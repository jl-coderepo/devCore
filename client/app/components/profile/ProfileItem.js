import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Typography,
  Button,
  Tooltip,
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  makeStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fab,
  Grid,
  Card,
  CardActions,
  CardContent
} from "@material-ui/core";

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

const ProfileItem = ({
  profile: {
    user: { _id, name },
    status,
    company,
    location,
    skills
  }
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color='inherit' variant='h6'>
              {name}
            </Typography>
            <Typography
              className={classes.pos}
              color='textSecondary'
              variant='subtitle2'
            >
              {`${status}${company ? ` | ${company}` : ""}${
                location ? ` | ${location}` : ""
              }`}
            </Typography>

            {skills.slice(0, 4).map((s, i) => (
              <Fragment key={i}>
                <Typography
                  className={classes.pos}
                  color='textSecondary'
                  variant='subtitle2'
                  display='inline'
                >
                  {`${i !== 0 ? ` | ${s}` : s}`}
                </Typography>
              </Fragment>
            ))}
            <Typography
              className={classes.pos}
              color='textSecondary'
              variant='subtitle2'
              display='inline'
            >
              {skills.length <= 4 ? "" : " | ..."}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container justify='flex-end'>
              <Link
                to={`/profile/${_id}`}
                className='react-link'
                color='inherit'
                underline='none'
              >
                <Typography
                  className={classes.pos}
                  color='textSecondary'
                  variant='subtitle2'
                >
                  Go To Profile
                </Typography>
              </Link>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;

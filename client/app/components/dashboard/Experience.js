import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";
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
  Grid
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "55%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

const Experience = ({ auth, profile, experience, deleteExperience }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const experiences = experience.map(exp => (
    <Fragment key={exp._id}>
      <ExpansionPanel
        expanded={expanded === exp._id.toString()}
        onChange={handleChange(exp._id.toString())}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel-content'
          id='panel-header'
        >
          <Typography className={classes.heading} color='inherit' variant='h6'>
            {exp.company}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {moment.utc(exp.from).format("MMMM DD, YYYY")}
            {" - "}
            {exp.to === null
              ? " Present"
              : moment.utc(exp.to).format("MMMM DD, YYYY")}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography color='inherit' variant='subtitle2'>
            {exp.title}
            {exp.location === null ? "" : ` | ${exp.location}`}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Grid container spacing={1}>
            <Grid item xs={10} md={11}>
              <Typography color='inherit' variant='body2'>
                {exp.description}
              </Typography>
            </Grid>
            {auth.user && auth.user._id === profile.profile.user._id && (
              <Grid item xs={2} md={1}>
                <Tooltip title='To delete this education' placement='right'>
                  <Fab
                    color='secondary'
                    aria-label='delete'
                    size='small'
                    onClick={() => deleteExperience(exp._id)}
                  >
                    <DeleteIcon />
                  </Fab>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Fragment>
  ));

  return (
    <Fragment>
      <Typography color='inherit' variant='h6'>
        Experience{experience.length > 1 ? "s" : ""}
      </Typography>
      {experiences}
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  user: PropTypes.object,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { deleteExperience })(Experience);

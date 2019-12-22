import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import {
  Typography,
  Button,
  Tooltip,
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });
  const classes = useStyles();
  const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <Typography color='inherit' variant='h6'>
        Add an Experience
      </Typography>
      <Typography color='inherit' variant='subtitle2'>
        Required *
      </Typography>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >
        <Tooltip title='What was your job title?' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='Title'
              name='title'
              value={title}
              onChange={e => onChange(e)}
              required
            />
          </FormControl>
        </Tooltip>
        <Tooltip title='What was the name of the company?' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='Company'
              name='company'
              value={company}
              onChange={e => onChange(e)}
              required
            />
          </FormControl>
        </Tooltip>
        <Tooltip title='Area of where the company is located' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='Location'
              name='location'
              value={location}
              onChange={e => onChange(e)}
            />
          </FormControl>
        </Tooltip>
        <br />
        <Tooltip title='When did you start working there' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              id='date'
              type='date'
              label='Start Date'
              name='from'
              value={from}
              onChange={e => onChange(e)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
        </Tooltip>
        <Tooltip title='When did you stop working there' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              id='date'
              type='date'
              label='End Date'
              name='to'
              value={to}
              disabled={toDateDisabled}
              onChange={e => onChange(e)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
        </Tooltip>
        <FormGroup>
          <FormControlLabel
            style={{ marginLeft: "2.5px" }}
            control={
              <Switch
                size='small'
                checked={toDateDisabled}
                onChange={() => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
                color='primary'
              />
            }
            label='Current'
          />
        </FormGroup>
        <br />
        <Tooltip
          title='A description of your resposbilities and day-to-day tasks'
          placement='right'
        >
          <FormControl className={classes.formControl} style={{ width: "75%" }}>
            <TextField
              label='Job Description'
              name='description'
              value={description}
              onChange={e => onChange(e)}
              multiline
              fullWidth
              rows='5'
            />
          </FormControl>
        </Tooltip>
        <br />
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
        <Button href='/dashboard' variant='outlined' color='primary'>
          Go Back
        </Button>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(withRouter(AddExperience));

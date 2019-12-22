import React, { Fragment, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
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

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });
  const classes = useStyles();
  const [toDateDisabled, toggleDisabled] = useState(false);
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <Typography color='inherit' variant='h6'>
        Add an Education
      </Typography>
      <Typography color='inherit' variant='subtitle2'>
        Required *
      </Typography>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <Tooltip title='Name of your school' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='School'
              name='school'
              value={school}
              onChange={e => onChange(e)}
              required
            />
          </FormControl>
        </Tooltip>
        <Tooltip title='The type of degree or certificate' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='Degree or Certificate'
              name='degree'
              value={degree}
              onChange={e => onChange(e)}
              required
            />
          </FormControl>
        </Tooltip>
        <Tooltip title='What was your field of study?' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='Major'
              name='fieldofstudy'
              value={fieldofstudy}
              onChange={e => onChange(e)}
            />
          </FormControl>
        </Tooltip>
        <br />
        <Tooltip title='When did you start' placement='right'>
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
        <Tooltip
          title='When are/did you graduating/graduate?'
          placement='right'
        >
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
        <Tooltip title='Describe your school career' placement='right'>
          <FormControl className={classes.formControl} style={{ width: "75%" }}>
            <TextField
              label='Description'
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
          <Link
            to='/dashboard'
            className='react-link'
            color='inherit'
            underline='none'
          >
            Go Back
          </Link>
        </Button>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));

import React, { Fragment, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  CircularProgress,
  Typography,
  Button,
  Select,
  FormControl,
  makeStyles,
  InputLabel,
  MenuItem,
  Tooltip,
  TextField
} from "@material-ui/core";
import { createProfile } from "../../actions/profile";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });
  const classes = useStyles();
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <Typography color='inherit' variant='h6'>
        Make Your Profile
      </Typography>
      <Typography color='inherit' variant='subtitle2'>
        Required *
      </Typography>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <Tooltip
          title='How would you generally describe your developer status?'
          placement='right'
        >
          <FormControl className={classes.formControl}>
            <InputLabel id='typeof-dev'>Developer *</InputLabel>
            <Select
              labelId='typeof-dev'
              id='simple-select'
              name='status'
              value={status}
              required
              onChange={e => onChange(e)}
            >
              <MenuItem value='Student'>Student</MenuItem>
              <MenuItem value='Junior Developer'>Junior Developer</MenuItem>
              <MenuItem value='Intermediate Developer'>
                Intermediate Developer
              </MenuItem>
              <MenuItem value='Developer'>Developer</MenuItem>
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
          </FormControl>
        </Tooltip>
        <br />
        <Tooltip title='Who do you work for?' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='Company'
              name='company'
              value={company}
              onChange={e => onChange(e)}
            />
          </FormControl>
        </Tooltip>
        <Tooltip title='Do you have a personal website?' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='Website'
              name='website'
              value={website}
              onChange={e => onChange(e)}
            />
          </FormControl>
        </Tooltip>
        <Tooltip title='City and State?' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='Location'
              name='location'
              value={location}
              onChange={e => onChange(e)}
            />
          </FormControl>
        </Tooltip>
        <Tooltip
          title='Please use comma separated values (ie. HTML,CSS,JavaScript)'
          placement='right'
        >
          <FormControl className={classes.formControl}>
            <TextField
              label='Skills'
              name='skills'
              value={skills}
              onChange={e => onChange(e)}
              required
            />
          </FormControl>
        </Tooltip>
        <Tooltip
          title='Github username in order to show off your latest projects'
          placement='right'
        >
          <FormControl className={classes.formControl}>
            <TextField
              label='Github Username'
              name='githubusername'
              value={githubusername}
              onChange={e => onChange(e)}
            />
          </FormControl>
        </Tooltip>
        <Tooltip title='Optional, provide social links' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='Twitter'
              name='twitter'
              value={twitter}
              onChange={e => onChange(e)}
            />
          </FormControl>
        </Tooltip>
        <Tooltip title='Optional, provide social links' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='Facebook'
              name='facebook'
              value={facebook}
              onChange={e => onChange(e)}
            />
          </FormControl>
        </Tooltip>
        <Tooltip title='Optional, provide social links' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='LinkedIn'
              name='linkedin'
              value={linkedin}
              onChange={e => onChange(e)}
            />
          </FormControl>
        </Tooltip>
        <Tooltip title='Optional, provide social links' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='Youtube'
              name='youtube'
              value={youtube}
              onChange={e => onChange(e)}
            />
          </FormControl>
        </Tooltip>
        <Tooltip title='Optional, provide social links' placement='right'>
          <FormControl className={classes.formControl}>
            <TextField
              label='Instagram'
              name='instagram'
              value={instagram}
              onChange={e => onChange(e)}
            />
          </FormControl>
        </Tooltip>
        <br />
        <Tooltip
          title='Introduce yourself, summary of who you are'
          placement='right'
        >
          <FormControl className={classes.formControl} style={{ width: "75%" }}>
            <TextField
              label='Bio'
              name='bio'
              value={bio}
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
        <Button variant='outlined' color='primary'>
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));

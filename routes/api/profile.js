const express = require("express");
const axios = require("axios");
const config = require("config");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

const router = express.Router();

/**
 * Retrieve current logged in user profile.
 *
 * @route   GET api/profile/me
 * @access  Private
 */
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(`  __PROFILE: ${err.message}`);
    res.status(500).send("Server error");
  }
});

/**
 * Create or update current logged in user profile.
 *
 * @route   POST api/profile
 * @access  Private
 */
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile object, with soft validations
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    // Build social object, with soft validations
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // If it already exists, then update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      // Create if none found
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(`  __PROFILE: ${err.message}`);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * Primary route gets all profiles, as this moves into production maybe best
 *   if we limit number of profiles to retrieve from database.
 *
 * @route   GET api/profile
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    // Just grab all their names for now
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * To get a users profile via their unique id generated from User model.
 *
 * @route   GET api/profile/user/:user_id
 * @access  Public
 */
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(`  __PROFILE: ${err.message}`);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

/**
 * Delete user and profile associated with it.
 *
 * @route   DELETE api/profile/
 * @access  Private
 */
router.delete("/", auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User have been deleted" });
  } catch (err) {
    console.error(`  __PROFILE: ${err.message}`);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

/**
 * Add experiences to profile.
 *
 * @route   PUT api/profile/experience
 * @access  Private
 * @aside   not sure if PUT or POST is best suited, think about it more
 */
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //Not sure when to handle sorting of experiences, for now to the front
      profile.experience.unshift(newExp);
      await profile.save();
      if (!profile) return res.status(400).json({ msg: "Profile not found" });
      res.json(profile);
    } catch (err) {
      console.error(`  __PROFILE: ${err.message}`);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * To delete a specific experience via it's id.
 *
 * @route    DELETE api/profile/experience/:exp_id
 * @access   Private
 */
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    const expIds = foundProfile.experience.map(exp => exp._id.toString());
    // if i dont add .toString() it returns this weird mongoose
    // coreArray and the ids are somehow objects and it still
    // deletes anyway even if you put /experience/5
    const removeIndex = expIds.indexOf(req.params.exp_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
      // console logs to figure out problem
      console.log("expIds", expIds);
      console.log("typeof expIds", typeof expIds);
      console.log("req.params", req.params);
      console.log("removed", expIds.indexOf(req.params.exp_id));
      foundProfile.experience.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (err) {
    console.error(`  __PROFILE: ${err.message}`);
    return res.status(500).json({ msg: "Server error" });
  }
});

/**
 * Add an education object to profile.
 *
 * @route   PUT api/profile/education
 * @access  Private
 * @aside   not sure if PUT or POST is best suited, think about it more
 */
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field of study is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(`  __PROFILE: ${err.message}`);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * To delete education from profile via it's id.
 *
 * @route   DELETE api/profile/education/:edu_id
 * @access  Private
 */
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    // probably better to use findIndex instead of mapping then finding index
    const eduIds = foundProfile.education.map(edu => edu._id.toString());
    // if i dont add .toString() it returns this weird mongoose coreArray
    // and the ids are somehow objects and it still deletes anyway even
    // if you put /education/5
    const removeIndex = eduIds.indexOf(req.params.edu_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
      foundProfile.education.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (err) {
    console.error(`  __PROFILE: ${err.message}`);
    return res.status(500).json({ msg: "Server error" });
  }
});

/**
 * Using github api to grab all repos given github username.
 *
 * @route   GET api/profile/github/:username
 * @access  Public
 * @aside   not sure if it's better to use this username or github username,
 *   when in production maybe best to store relevant repo info
 */
router.get("/github/:username", async (req, res) => {
  try {
    // Only grabbing 5 for alpha phase
    const githubURI = `https://api.github.com/users/${
      req.params.username
    }/repos?per_page=5&sort=created:asc&client_id=${process.env
      .GITHUBCLIENTID || config.get("githubClientId")}&client_secret=${process
      .env.GITHUBSECRET || config.get("githubSecret")}`;
    const githubRes = await axios.get(githubURI);
    res.json(githubRes.data);
  } catch (err) {
    console.error(`  __PROFILE: ${err.message}`);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

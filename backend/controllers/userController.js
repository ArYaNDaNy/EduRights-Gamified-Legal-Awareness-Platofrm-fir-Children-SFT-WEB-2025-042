const { User } = require('../models/User');


exports.getTotalStudents = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'KID' });
    console.log(totalStudents)
    res.status(200).json({
      success: true,
      totalStudents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch total students'
    });
  }
};

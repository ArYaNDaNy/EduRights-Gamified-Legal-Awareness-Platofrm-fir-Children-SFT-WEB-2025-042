const { User } = require('../models/User');
const { UserModuleProgress } = require('../models/Progress');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'KID' })
      .select('name email');

    const studentsWithStats = await Promise.all(
      students.map(async (student) => {
        const enrolledCount = await UserModuleProgress.countDocuments({
          user_id: student._id
        });

        return {
          _id: student._id,
          name: student.name,
          email: student.email,
          enrolled: enrolledCount
        };
      })
    );

    res.status(200).json({
      success: true,
      students: studentsWithStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students'
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);
    await UserModuleProgress.deleteMany({ user_id: id });

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete student'
    });
  }
};

const { LegalModule } = require('../models/Content');

exports.createModule = async (req, res) => {
  try {
    const {
      title,
      description,
      badge_icon,
      badge_title,
      learning_summary,
      time_estimate_minutes,
      completion_bonus_xp,
    } = req.body;

    const module = await LegalModule.create({
      title,
      description,
      badge_icon,
      badge_title,
      learning_summary,
      time_estimate_minutes,
      completion_bonus_xp,
    });

    res.status(201).json({
      success: true,
      module
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create module'
    });
  }
};


const { Level } = require('../models/Content');

exports.createLevel = async (req, res) => {
  try {
    const {
      module_id,
      level_number,
      title,
      video_id,
      xp_reward,
      difficulty
    } = req.body;

    // Prevent duplicate 
    const existingLevel = await Level.findOne({
      module_id,
      level_number
    });

    if (existingLevel) {
      return res.status(400).json({
        success: false,
        message: 'Level number already exists for this module'
      });
    }

    const level = await Level.create({
      module_id,
      level_number,
      title,
      video_id,
      xp_reward,
      difficulty
    });

    res.status(201).json({
      success: true,
      level
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create level'
    });
  }
};

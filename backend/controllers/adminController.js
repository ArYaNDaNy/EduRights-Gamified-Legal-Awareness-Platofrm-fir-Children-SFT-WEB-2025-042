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


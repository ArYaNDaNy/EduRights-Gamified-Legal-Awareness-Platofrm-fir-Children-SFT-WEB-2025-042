const { Level } = require('../models/Content');

exports.getLevelsByModule = async (req, res) => {
  try {
    const { moduleId } = req.params;

    const levels = await Level.find({ module_id: moduleId })
      .sort({ level_number: 1 });

    res.status(200).json({
      success: true,
      levels
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch levels'
    });
  }
};

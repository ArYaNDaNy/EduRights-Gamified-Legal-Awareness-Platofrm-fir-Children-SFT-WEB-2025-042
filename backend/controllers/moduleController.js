const { LegalModule } = require('../models/Content');

exports.getAllModules = async (req, res) => {
  try {
    const modules = await LegalModule.find();

    res.status(200).json({
      success: true,
      modules
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch modules'
    });
  }
};

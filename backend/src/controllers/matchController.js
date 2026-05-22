const User = require('../models/User');

const getMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    let targetRole;
    if (currentUser.role === 'technical_founder') {
      targetRole = 'business_founder';
    } else if (currentUser.role === 'business_founder') {
      targetRole = 'technical_founder';
    } else {
      return res.status(400).json({ message: 'Only founders can access matches' });
    }

    const matches = await User.aggregate([
      { $match: { role: targetRole } },
      {
        $addFields: {
          matchScore: {
            $add: [
              
              { $cond: [{ $eq: ['$timeCommitment', currentUser.timeCommitment] }, 30, 0] },
              
              {
                $multiply: [
                  {
                    $size: {
                      $setIntersection: [
                        { $ifNull: ['$industryInterests', []] },
                        { $ifNull: [currentUser.industryInterests, []] }
                      ]
                    }
                  },
                  20 
                ]
              }
              
            ]
          }
        }
      },
      { $sort: { matchScore: -1 } },
      { $limit: 20 },
      { $project: { password: 0 } }
    ]);

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMatches };

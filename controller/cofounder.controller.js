const Founder = require("../model/Founder");
const { calculateMatchScore } = require("../util/score");


exports.searchCofounders = async (req, res) => {
    const criteria = req.query;
    // console.log("..............", criteria);
    // console.log(req.user);
    const loggedInFounderId = req.user
    try {
        const allFounders = await Founder.find({ lookingForCofounder: true, userId: { $ne: loggedInFounderId } },);
        console.log(allFounders);

        const matches = allFounders.map(founder => ({
            ...founder._doc,
            matchScore: calculateMatchScore(founder, criteria),
        }));

        // matches.sort((a, b) => b.matchScore - a.matchScore);
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





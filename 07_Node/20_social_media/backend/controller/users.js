import { 
    addNewFollowerDb, removeExistingFollowerDb,
    getLimitedNonFollowersDb,
} from "./prisma_users.js";

async function cntlrFollowRequest(req,res) {
    const userId = req.user?.id;
    const { targetId } = req.query;
    try {
        const added = await addNewFollowerDb(userId, Number(targetId));
        return res.status(200).json( added );
    } catch(err) {
        return res.status(404).json({ message: `You're already connected to this user` });
    }
}

async function cntlrFollowDelete(req,res) {
    const userId = req.user?.id;
    const { targetId } = req.query;
    try {
        const added = await removeExistingFollowerDb(userId, Number(targetId));
        return res.status(200).json( added );
    } catch(err) {
        return res.status(404).json({ message: `You're not friends with this user` });
    }
}

async function cntlrFindNonFollowers(req,res) {
    const userId = req.user?.id;
    try {
        const users = await getLimitedNonFollowersDb(userId, 5);
        if (!users) {
            return res.status(200).json({message: "Everyone is part of your follow/following list"})
        } else {
            return res.status(200).json( users );
        }
    } catch(err) {
        return res.status(500).json({ message: err.message || 'Internal server error' });
    }
}

export { 
    cntlrFollowRequest, cntlrFollowDelete, cntlrFindNonFollowers 
}
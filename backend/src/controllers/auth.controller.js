import { User } from "../models/user.model.js"; // Use Capital U for the model

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imgUrl } = req.body;

    const existingUser = await User.findOne({ clerkId: id });
    const avatarUrl =
      imgUrl ||
      `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`;

    if (!existingUser) {
      await User.create({
        fullName: `${firstName} ${lastName}`,
        imgUrl: imgUrl || avatarUrl,
        clerkId: id,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("error in /auth/callback:", error);
    next(error);
  }
};

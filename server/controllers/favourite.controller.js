import FavoriteModel from "../models/favorite.model.js";
import UserModel from "../models/user.model.js";

export const addFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { userToAddId } = req.body;

    let favourite = await FavoriteModel.findOne({ userId });

    if (!favourite) {
      favourite = new FavoriteModel({ userId, favouriteUsers: [userToAddId] });
    } else {
      if (favourite.favouriteUsers.includes(userToAddId)) {
        return res
          .status(400)
          .json({ error: "User already exists in favorites." });
      }

      favourite.favouriteUsers.push(userToAddId);
    }

    await favourite.save();
    res.status(200).json({ message: "User successfully added to favorites." });
  } catch (error) {
    console.error("Error in addFavorite: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFavorites = async (req, res) => {
  const userId = req.user._id;

  try {
    const favourite = await FavoriteModel.findOne({ userId });

    if (!favourite) {
      return res.status(200).json({ users: [] });
    }

    const favouriteUserIds = favourite.favouriteUsers;
    const favoriteUsers = await UserModel.find({
      _id: { $in: favouriteUserIds },
    }).select("-password -contacts");

    res.status(200).json(favoriteUsers);
  } catch (error) {
    console.error("Error in addFavorite: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeFavorite = async (req, res) => {
  const userId = req.user._id;
  const { favouriteId } = req.params;

  const favourite = await FavoriteModel.findOne({ userId });
  if (!favourite) return res.status(404).json({ error: "Favourite not found" });

  const favouriteIndex = favourite.favouriteUsers.findIndex(
    (item) => item.toString() === favouriteId
  );

  if (favouriteIndex === -1) {
    return res
      .status(404)
      .json({ error: "User not found in the favorite list." });
  }

  favourite.favouriteUsers.splice(favouriteIndex, 1);
  await favourite.save();

  res.status(200).json({ message: "Favorite successfully removed" });

  try {
  } catch (error) {
    console.error("Error in removeFavorite: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

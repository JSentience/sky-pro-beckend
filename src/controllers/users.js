import User from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findByIdAndUpdate(user_id, req.body, {
      returnDocument: "after", // вернуть обновлённый документ
      runValidators: true, // проверять валидацию при обновлении
    });

    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findByIdAndDelete(user_id);

    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }

    res.status(200).send({ message: `Пользователь ${user.username} удалён` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

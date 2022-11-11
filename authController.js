const User = require("./models/User");
const Role = require("./models/Role");
const Basket = require("./models/Basket");
const MostSaledItems = require("./models/MostSaledItems");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");
const Categories = require("./models/Categories");
const Phone = require("./models/Phone");
const Watch = require("./models/Watch");
const Laptop = require("./models/Laptop");
const Ipad = require("./models/Ipad");

const jwt_decode = require("jwt-decode");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error in registration", errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "User with this username already exists" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: "User was created" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration Error" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User with this ${username} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: `Written wrong password` });
      }

      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token, _id: user._id, role: user.roles });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login Error" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const deleteUser = await User.findByIdAndDelete({ _id: id });
      res.json({ deleteUser, message: "User was delete" });
    } catch (e) {
      console.log(e);
    }
  }

  async mostSaledItemsGet(req, res) {
    try {
      const mostSaledItems = await MostSaledItems.find();
      res.json(mostSaledItems);
    } catch (e) {
      console.log(e);
    }
  }

  async mostSaledOneItemsGet(req, res) {
    try {
      const { id } = req.params;
      const mostSaledItems = await MostSaledItems.findById({ _id: id });
      res.json(mostSaledItems);
    } catch (e) {
      console.log(e);
    }
  }

  async postBasket(req, res) {
    try {
      const { name, description, price, img, basketImg, isToggle } = req.body;
      const card = await Basket.create({
        name,
        description,
        price,
        img,
        basketImg,
        isToggle,
      });
      await card.save();
      res.json({ card, message: "card created" });
    } catch (e) {
      console.log(e);
    }
  }

  async getBasket(req, res) {
    try {
      const baskets = await Basket.find();
      res.json(baskets);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteCard(req, res) {
    try {
      const { id } = req.params;
      const edit = await MostSaledItems.findByIdAndUpdate(id, {
        isToggle: false,
      });
      const deletedCard = await Basket.findByIdAndDelete({ _id: id });
      res.json({ edit, message: "card was delete" });
    } catch (e) {
      console.log(e);
    }
  }

  async editBasket(req, res) {
    try {
      const { id } = req.params;
      const _id = id;
      const editedCard = await MostSaledItems.findByIdAndUpdate(_id, {
        isToggle: true,
      });
      res.json({ editedCard, message: "card was edit" });
    } catch (e) {
      console.log(e);
    }
  }

  async categoriesGet(req, res) {
    try {
      const categories = await Categories.find();
      res.json(categories);
    } catch (e) {
      console.log(e);
    }
  }

  async categoriesOneGet(req, res) {
    try {
      const { id } = req.params;
      const categories = await Categories.findById({ _id: id });
      res.json(categories);
    } catch (e) {
      console.log(e);
    }
  }

  async gadjetGet(req, res) {
    try {
      const { name } = req.params;

      let response;

      switch (name) {
        case "Phones":
          response = await Phone.find();
          break;
        case "Laptops":
          response = await Laptop.find();
          break;
        case "Watches":
          response = await Watch.find();
          break;
        case "Ipads":
          response = await Ipad.find();
          break;
      }

      res.json(response);
    } catch (e) {
      console.log(e);
    }
  }

  async phonesPost(req, res) {
    try {
      const { name, description, price, img } = req.body;
      const card = await Ipad.create({ name, description, price, img });
      await card.save();
      res.json({ card, message: "card created" });
    } catch (e) {
      console.log(e);
    }
  }

  async gadjetPut(req, res) {
    try {
      const { name, id } = req.params;
      const { itemName, description, price, img } = req.body;
      const _id = id;
      let response;

      switch (name) {
        case "Phones":
          response = await Phone.findByIdAndUpdate(
            { _id },
            { name: itemName, description: description, img: img, price: price }
          );
          break;
        case "Laptops":
          response = await Laptop.findByIdAndUpdate(
            { _id },
            { name: itemName, description: description, img: img, price: price }
          );
          break;
        case "Watches":
          response = await Watch.findByIdAndUpdate(
            { _id },
            { name: itemName, description: description, img: img, price: price }
          );
          break;
        case "Ipads":
          response = await Ipad.findByIdAndUpdate(
            { _id },
            { name: itemName, description: description, img: img, price: price }
          );
          break;
      }
      res.json(response);
    } catch (e) {
      console.log(e);
    }
  }

  async gadjetPost(req, res) {
    try {
      const { name } = req.params;
      const { itemName, description, price, img ,type} = req.body;
      let response;
      switch (name) {
        case "Phones":
          response = await Phone.create({
            name: itemName,
            description: description,
            img: img,
            price: price,
            type
          });
          await response.save();
          break;
        case "Laptops":
          response = await Laptop.create({
            name: itemName,
            description: description,
            img: img,
            price: price,
            type
          });
          await response.save();
          break;
        case "Watches":
          response = await Watch.create({
            name: itemName,
            description: description,
            img: img,
            price: price,
            type
          });
          await response.save();
          break;
        case "Ipads":
          response = await Ipad.create({
            name: itemName,
            description: description,
            img: img,
            price: price,
            type
          });
          await response.save();
          break;
      }
      res.json(response);
    } catch (e) {
      console.log(e);
    }
  }

  async gadjetDelete(req, res) {
    try {
      const { name, id } = req.params;
      let response;
      switch (name) {
        case "Phones":
          response = await Phone.findByIdAndDelete({ _id: id });
          break;
        case "Laptops":
          response = await Laptop.findByIdAndDelete({ _id: id });
          break;
        case "Watches":
          response = await Watch.findByIdAndDelete({ _id: id });
          break;
        case "Ipads":
          response = await Ipad.findByIdAndDelete({ _id: id });
          break;
      }
      res.json(response);
    } catch (e) {
      console.log(e);
    }
  }
  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword, token } = req.body;
      let decoded = jwt_decode(token);
      const user = await User.findById({ _id: decoded.id });
      const hashNewPassword = bcrypt.hashSync(newPassword, 7);

      if (!user) {
        return res
          .status(400)
          .json({ message: `User with this ${username} not found` });
      }
      const validPassword = bcrypt.compareSync(oldPassword, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Written wrong password` });
      }
      const editedPassword = await User.findByIdAndUpdate(
        { _id: decoded.id },
        { password: hashNewPassword }
      );
      res.json({ editedPassword, message: "password replace" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login Error" });
    }
  }

  async editUserImg(req, res) {
    try {
      const { token, img } = req.body;
      let decoded = jwt_decode(token);
      const editedUserImg = await User.findByIdAndUpdate(
        { _id: decoded.id },
        { img: img }
      );
      res.json({ editedUserImg, message: "Img was edit" });
    } catch (e) {
      console.log(e);
    }
  }

  async getOneUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById({ _id: id });
      res.json({ user, message: "User" });
    } catch (e) {
      console.log(e);
    }
  }
  async searchGadjet(req, res) {
    try {
      const { search } = req.query;
      const PhoneData = await Phone.find();
      const IpadData = await Ipad.find();
      const WatchData = await Watch.find();
      const LaptopData = await Laptop.find();
      const data = PhoneData.concat(IpadData, WatchData, LaptopData);
      const filteredData = data.filter((item) =>
        item.name
          .split(" ")
          .join("")
          .toLowerCase()
          .includes(search.split(" ").join("").toLowerCase())
      );
      res.json(filteredData);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();

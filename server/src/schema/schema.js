import * as graphql from "graphql";
import User from "../models/user";
import {
  UserType,
  UsersType,
  UserInput,
  UserLoginPayload,
} from "./graphQLTypes";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    users: {
      type: UsersType,
      resolve() {
        return User.find();
      },
    },
    userByEmail: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        // Code to fetch from database.
        return User.findOne({ email: args.email });
      },
    },
    userByName: {
      type: UserType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        // Code to fetch from database.
        return User.findOne({ name: args.name });
      },
    },
  },
});

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.secret || "", {
    expiresIn: "1h",
  });
};

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        user: { type: UserInput },
      },
      resolve(parent, { user }) {
        let newUser = new User(user);
        return newUser.save();
      },
    },
    updateUser: {
      type: UserType,
      args: {
        user: { type: UserInput },
      },
      async resolve(parent, { user }) {
        await User.findOneAndUpdate({ email: user.email }, user);
        return await User.findOne({ email: user.email });
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.findOneAndDelete({ name: args.name });
      },
    },
    userLogin: {
      type: UserLoginPayload,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const errorMessage = "Incorrect username or password.";
        try {
          let user = await User.findOne({ email: args.email });
          if (user && bcrypt.compareSync(args.password, user.password)) {
            return { user, token: generateToken(user) };
          }
          return new Error(errorMessage);
        } catch (error) {
          return new Error(errorMessage);
        }
      },
    },
    userRegister: {
      type: UserLoginPayload,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      async resolve(parent, { email, password, name }) {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          const hashedPassword = await bcrypt.hash(password, 10);
          await User.create(
            new User({
              email,
              password: hashedPassword,
              name,
              resumes: [
                {
                  name,
                  email,
                  address: "",
                  phone: "",
                  about: "",
                  experience: [],
                },
              ],
            })
          );
          const user = await User.findOne({ email });
          return { user, token: generateToken(user) };
        }
        return new Error("Email is already taken.");
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

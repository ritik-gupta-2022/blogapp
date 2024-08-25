import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password || username === '' || email === '' || password === ''){
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign({ id: validUser._id, isAdmin:validUser.isAdmin }, process.env.JWT_SECRET_KEY,);

     // { ...rest } collects the remaining properties of the validUser._doc object (excluding password) into a new object called rest. because we do't want to send password in our response object
     const { password :pass, ...rest} = validUser._doc

    res.status(200).cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id, isAdmin:user.isAdmin }, process.env.JWT_SECRET_KEY);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id, isAdmin:newUser.isAdmin }, process.env.JWT_SECRET_KEY);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};





// JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity-protected with a Message Authentication Code (MAC) and/or encrypted.

// JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA. This ensures that the claims cannot be altered after the token is issued.

// After a user successfully logs in using their credentials, an ID token is returned. This token is used to authenticate the user and is sent on each subsequent request to protected routes or resources. The server then verifies the token to grant access.

// When a POST request is made to /login, the server simulates user authentication.
// If authentication is successful, a JWT token is generated using the jsonwebtoken library.
// The server responds with a status code of 200, sets an access_token cookie with the token value (marked as HTTP-only), and sends the user data as a JSON response.

// HTTP-only Cookies: Setting the cookie with httpOnly: true is a good security practice to prevent client-side scripts from accessing the token, reducing the risk of XSS attacks.



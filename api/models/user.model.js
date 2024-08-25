import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbVsUq0NUuPRFvSY22CKaxR-yBLF1LWuH8Ow&s`
    },
    isAdmin:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;


// creating model(now we can create instaces using User mode)
// const User = mongoose.model('User', userSchema);

// export default User

// Documents: Instances of a schema that represent individual records stored in a MongoDB collection.
// timeStamp saves the time of the new instance made along with the data
// model is a constructor function which creates documents(instances)
// schema are the kind of rules, Mongoose schemas allow you to define the structure of your documents and enforce data types and constraints.



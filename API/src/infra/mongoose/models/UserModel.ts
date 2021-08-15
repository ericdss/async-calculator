import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true 
    },
    roles: [{
      type: String,
      required: true
    }],
    creationDateTime: {
      type: Date,
      required: true
    }
  },
  {
      collection: 'users'
  });

interface UserSchemaProps {
    id?: mongoose.Types.ObjectId,
    fullName: string,
    email: string,
    password: string,
    roles: Array<string>,
    creationDateTime: Date
}

export default mongoose.model('User', userSchema);
export { UserSchemaProps };
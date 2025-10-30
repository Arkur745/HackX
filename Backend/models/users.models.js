import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: {
      values: ['PATIENT', 'DOCTOR', 'ADMIN'],
      message: '{VALUE} is not a valid role'
    },
    required: [true, 'Role is required'],
    default: 'PATIENT'
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);

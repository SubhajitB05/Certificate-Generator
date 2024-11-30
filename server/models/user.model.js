import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    minlength: [3, 'Full name must be at least 3 characters long'],
    maxlength: [50, 'Full name must be less than 50 characters'],
    trim: true,  // Removes leading/trailing whitespaces
    match: [/^[a-zA-Z\s]+$/, 'Full name should only contain letters and spaces'] // Only letters and spaces
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,  
    lowercase: true,  // Converts email to lowercase before saving
    trim: true,
    validate: {
      validator: function(value) {
        // Regular expression to validate email format
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Please enter a valid email address'
    }
  },
  
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: function(value) {
        // Ensures password contains at least one uppercase letter, one number, and one special character
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value);
      },
      message: 'Password must include at least one uppercase letter, one number, and one special character'
    }
  },

  role:{
    type:String,
    enum: ['admin', 'user'],
    default: 'user'   
  }
});

const User = mongoose.model('User', UserSchema);
export default User;
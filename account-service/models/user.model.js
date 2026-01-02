
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  
  // 3. Define the 'username' field and its constraints.
  username: {
    type: String,     
    required: true,  
    unique: true,    
                      
    trim: true        
  },
  
  // 4. Define the 'email' field and its constraints.
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,  
                      
    trim: true
  },
  
  // 5. Define the 'password' field.
  password: {
    type: String,
    required: true
   
  },

  role: {
    type: String,
    enum: ['Customer', 'Vendor', 'Admin'], // Defines the allowed values
    default: 'Customer' // New users are 'Customer' by default
  }
}, 
// 6. Schema Options
{ 
  
  timestamps: true 
}
);

// 7. Compile the Schema into a Model and export it.

module.exports = mongoose.model('User', userSchema);








import jwt from 'jsonwebtoken';

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    
    if (!atoken) {
      
      return res.json({ success: false, message: 'Not authorized' });
    }

    // Decode the token
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    // Check if the role is 'admin' and the email matches
    if (
      token_decode.email !== process.env.ADMIN_EMAIL ||
      token_decode.role !== 'admin'
    ) {
      
      return res.json({ success: false, message: 'Not authorized' });
    }

    // Proceed if the token is valid
    next();
  } catch (error) {
    console.log(error);
  
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;

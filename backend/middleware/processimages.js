const processimages = async (req, res, next) => {
    console.log(req.files);
    try {
      if (!req.files || req.files.length === 0) {
        req.mediaData = []; 
      } else {
        const files = req.files;
        console.log(files);
        req.mediaData = [];
        
        for (const file of files) {
          req.mediaData.push({
            filename: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            base64String: file.buffer.toString('base64')
          });
        }
      }
      next();
    } catch (error) {
      console.error('Error processing images:', error);
      res.status(500).json({ message: 'Error processing images' });
    }
  };
  
  module.exports = processimages;
const multer = require('multer');

const createMulterUpload = () => {
  
  const storage = multer.memoryStorage();
  
  const upload = multer({ storage: storage });

  const uploadimages = upload.array('media', 5); 
  return uploadimages;
};

module.exports = createMulterUpload;
import multer from "multer";
import path from 'path'

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, `src/public/images/users`)
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("error/image-not-allowed"))
        }
        cb(undefined, true)
    }

})

export default imageUpload;
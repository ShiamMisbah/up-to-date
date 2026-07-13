import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fieldSize: 16 * 1024 * 1024
    }
})

export default upload;
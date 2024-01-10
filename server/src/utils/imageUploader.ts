import multer from 'multer'
import { v4 } from 'uuid';

export default multer({
    storage: multer.diskStorage({
        destination: `${__dirname}/../public/images`,
        filename: function (_, file, cb) {
            const fileNameSplit = file.originalname.split('.')
            const fileName = `${v4()}.${fileNameSplit[fileNameSplit.length - 1]}`
            cb(null, fileName)
        }
    }),
    fileFilter: (_, file, cb) => {
        const allowedFileTypes = ['image/jpeg', 'image/png'];
        cb(null, !!allowedFileTypes.includes(file.mimetype))
    },
});

import {body} from "express-validator";

export const loginValidation = [
    body('email', 'Email is not correct').isEmail(),
    body('password', 'The password must be at least 5 symbols').isLength({ min: 5 }),
]
export const registerValidation = [
    body('email', 'Email is not correct').isEmail(),
    body('password', 'The password must be at least 5 symbols').isLength({ min: 5 }),
    body('fullName', 'Enter name').isLength({ min: 3 }),
    body('avatarUrl', 'Url is not correct').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Enter article title').isLength({ min: 3 }).isString(),
    body('text', 'Enter article text').isLength({ min: 3 }).isString(),
    body('tags', 'Teg format is not correct').optional().isString(),
    body('imageUrl', 'Url is not correct').optional().isString(),
]
import { cloudInit } from './init'

export const cloud = cloudInit()

export const db = cloud.database()

export const userCol = db.collection('user')

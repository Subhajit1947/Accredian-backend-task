import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import {main} from '../utils/sendMail'
const prisma = new PrismaClient()

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


const refreralCtrollers=async(req:Request,res:Response)=>{
    const {refereeName,refereeEmail,name,email,course}=req.body
    const coursearr=['FRONTEND_DEVELOPMENT',
        'BACKEND_DEVELOPMENT',
        'FULLSTACK_DEVELOPMENT',
        'DATA_SCIENTISTS',
        'MACHINE_LEARNING',]
    if(!validateEmail(email)){
        return res.status(404).json({"message":"provide a correct email"})
    }
    if(!validateEmail(refereeEmail)){
        return res.status(404).json({"message":"provide a correct refereeEmail"})
    }
    if(!name || !refereeName || !course){
        return res.status(404).json({"message":"all fields are required"})
    }
    if(!coursearr.includes(course.trim().toUpperCase())){
        return res.status(404).json({"message":"this course is now not avaliable"})
    }
    try {
        const existrefarel=await prisma.referral.findFirst({
            where: {
                email,
                refereeEmail,
                course,
            }
        })
        if(existrefarel){
            return res.status(403).json({"message":"referal already sent"})
        }
        const neweferel=await prisma.referral.create({
            data: {
              name,
              email,
              refereeEmail,
              refereeName,
              course
            },
        })
        if(!neweferel){
            return res.status(500).json({"message":"somthing went to wrong try after some times😒😒"})
        }
        const sentmail=await main(refereeEmail,email,name,refereeName,course)
        if(!sentmail){
            return res.status(500).json({"message":"somthing went to wrong in send mail😒😒"}) 
        }
        return res.status(201).json(neweferel)
    } catch (error:any) {
        return res.status(500).json({"message":`somthing went to wrong try after some times😒😒 ${error.message}`})
    }
}

export {refreralCtrollers}
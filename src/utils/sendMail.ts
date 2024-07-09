import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});


async function main(refereeEmail:string,email:string,name:string,refereeName:string,course:string) {
  const info = await transporter.sendMail({
    from: refereeEmail,
    to: email,
    subject: ` Your friend  ${refereeName} has invited you to learn ${course} !`, 
   
    html: `
        <p>Hi ${name},</p>
        <p>Your friend, ${refereeName}, has invited you to join the course and explore the world of learning!</p>
        <p>${refereeName} thinks you might be interested in this course </p>
        <p>Course Name: ${course}</p>
        
        <p>Ready to start learning?</p>
        
        <p>**P.S.** As a bonus for joining through ${refereeName}'s referral, you'll receive some referral bonus or discount offered</p>
        <p>Happy learning!</p>
        <p>Thank you💖</p>
    `
  });

  return info.messageId
}

// main().catch(console.error);
export {main}

const nodemailer = require("nodemailer");
  
const mailSender = async(email, title, body)=>{ 

    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            secure:true,
            auth:{
                user : process.env.MAIL_USER,
                pass :process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from:'EduNotion || By Tiwari',
            to: `${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log("info is -->",info);
        return info;
    } catch (error) {
        console.log("Error is coming at mailsender function ");
        console.log(error.message);
    }
}
module.exports= mailSender;
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import { createTransport } from 'nodemailer';
import logger from "../utils/logger.js";
import { PrismaClient } from "@prisma/client";
import { smtp_host, smtp_pass, smtp_port, smtp_user } from "../configs/env_configs.js";

class EmailRepository{
    static transporter
    static prisma = new PrismaClient()

    static getTransporter(){
        if(!this.transporter){
            this.transporter = createTransport({
                host: smtp_host, // Hostinger SMTP server
                port: smtp_port, // Port for sending mail
                secure: true, // Use SSL (false for TLS)
                auth: {
                  user: smtp_user, // Your email address
                  pass: smtp_pass, 
                },
              });
        }
        
        return this.transporter
    }

    static sendMail({ subject, to, text, html}){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const mailOptions = {
                    from: smtp_user, // Sender address
                    to: to, // Recipient address
                    subject: subject,
                    text: text,
                    html: html
                }
        
                const transporter = this.getTransporter()

                await transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      logger.error('Error sending email:', error);
                    } else {
                      logger.info('Email sent:', info.response);
                    }
                  })


                return resolve(true)
                
            })
        )
    }
} 

export default EmailRepository
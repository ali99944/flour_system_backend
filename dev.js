// import EmailRepository from "./repositories/Email.js";
// import fs from 'fs';
// import path from 'path';
// import ejs from 'ejs';

import BackupRepository from "./repositories/Backup.js";
import SaleHelperRepository from "./repositories/SaleHelper.js";

// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const sendPasswordEmail = async (userEmail, username, password, companyName) => {
//     // Read the EJS template file
//     const templatePath = path.join(__dirname, 'templates/password_template.ejs');
//     const templateContent = fs.readFileSync(templatePath, 'utf-8');
  
//     // Render the EJS template with data
//     const emailContent = ejs.render(templateContent, {
//       username,
//       password,
//       companyName
//     });

//     await EmailRepository.sendMail({
//         subject: "Password Reset",
//         to: userEmail,
//         text: emailContent,
//         html: emailContent
//     })
// }

// sendPasswordEmail('alitarek99944@gmail.com', 'John Doe', 'examplePassword123', 'Electronic Store');


// try{
//   const response = await SaleHelperRepository.validateFlourSufficiency([
//     {
//       flour_id: 5,
//       quantity: 30
//     }
//   ])

//   console.log(response)
// }catch(err){
//   console.log(err.message)
// }

// ===========================================================================

// try{
//   const response = await SaleHelperRepository.convertItemsIntoStorageOuts({
//     items: [
//       {
//         flour_id: 5,
//         quantity: 40,
//         client_price: 20
//       },
//       {
//         flour_id: 6,
//         quantity: 30,
//         client_price: 20
//       }
//     ],
//     client_id: 5,
//     client_price: 20
//   })

//   console.log(response)
// }catch(err){
//   console.log(err.message)
// }


try{
  await BackupRepository.createBackup()
}catch(err){
  console.log(err.message)
}
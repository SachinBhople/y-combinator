const { format, subDays } = require('date-fns');
const cron = require('node-cron');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../util/email');
const BookWorkshop = require('../model/BookWorkshop');
const Auth = require('../model/Auth');

exports.bookworkshop = asyncHandler(async (req, res) => {
    await BookWorkshop.create(req.body)
    const { founder, workshops } = req.body;
    const founderDetails = await Auth.findById(founder).exec();
    console.log(founderDetails);

    const workshopDate = new Date(workshops.date);
    const emailDate = subDays(workshopDate, 1);
    const formattedDate = format(workshopDate, 'dd/MM/yyyy');
    console.log(emailDate);

    const styledServer =
        `
        <html>
        <head>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                }
                h1 {
                    color: #007BFF;
                }
                p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #555;
                }
                .phone-number {
                    background-color: #87CEEB;
                    padding: 10px;
                    display: inline-block;
                    color: white;
                }
                .center-text {
                    text-align: left;
                }
                .left-text {
                    text-align: left;
                }
                .signature {
                    margin-top: 20px;
                    font-style: italic;
                }
            </style>
        </head>
        <body>
            <p class="left-text" style="font-weight: bold;">Hello, ${founderDetails.name},</p>
            <h1 class="center-text">
                ${workshops.title}
            </h1>
            <p class="center-text">
                ${workshops.desc}
            </p>
            <p class="center-text">
            Date: ${formattedDate}
            </p>
            <p class="center-text">
            Location: ${workshops.location}
            </p>
            <p class="center-text">
                Join the workshop on time. Thank you.
            </p>
        </body>
        </html>`;

    const dayBeforeWorkshopCron = `${emailDate.getMinutes()} ${emailDate.getHours()} ${emailDate.getDate()} ${emailDate.getMonth() + 1} *`;
    console.log(dayBeforeWorkshopCron)
 
    cron.schedule(dayBeforeWorkshopCron, async () => {
        console.log('Sending reminder email one day before the workshop.');
        await sendEmail({
            to: founderDetails.email,
            html: styledServer,
            subject: `Reminder: Workshop on ${workshops.title}`
        });
    }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });

    res.status(200).json({ message: "Workshop booked successfully and reminder scheduled." });
});

// exports.bookworkshop = asyncHandler(async (req, res) => {
//     await BookWorkshop.create(req.body)
//     const { founder, workshops } = req.body
//     const founderDetails = await Auth.findById(founder).exec();
//     console.log(founderDetails);
//     const formattedDate = format(new Date(workshops.date), 'dd/MM/yyyy')
//     const styledServer = ` <html>
//     <head>
//         <style>
//             body {
//                 font-family: 'Arial', sans-serif;
//                 background-color: #f4f4f4;
//                 color: #333;
//             }
//             h1 {
//                 color: #007BFF;
//             }
//             p {
//                 font-size: 16px;
//                 line-height: 1.6;
//                 color: #555;
//             }
//             .phone-number {
//                 background-color: #87CEEB;
//                 padding: 10px;
//                 display: inline-block;
//                 color:white;
//             }
//             .center-text {
//                 text-align: left;
//             }

//             .left-text {
//                 text-align: left;
//             }

//             .signature {
//                 margin-top: 20px;
//                 font-style: italic;
//             }
//         </style>
//     </head>
//     <body>
//         <p class="left-text" style="font-weight: bold;">Hello, ${founderDetails.name},</p>
//         <h1 class="center-text">
//             ${workshops.title}
//         </h1>
//         <p class="center-text">
//             ${workshops.desc}
//         </p>
//         <p class="center-text">
//           Date: ${formattedDate}
//         </p>
//         <p class="center-text">
//          location:  ${workshops.location}

//         </p>    
//         <p class="center-text">
//             join workshop on time thank you
//         </p>


//     </body>
// </html>`

//     cron.schedule('24 16 * * *', async () => {
//         console.log('Running a job at 14:13 IST');
//         await sendEmail({
//             to: founderDetails.email,
//             html: styledServer,
//             subject: `Workshop on ${workshops.title}`
//         });
//     }, {
//         scheduled: true,
//         timezone: "Asia/Kolkata"
//     });


//     res.status(200).json({ messsge: "workshop book success" })
// })

exports.getWorkshopById = asyncHandler(async (req, res) => {
    const result = await BookWorkshop.find()
        .populate("workshops")
        .populate("founder");
    res.status(200).json({ message: "Workshops fetch success", result });
});


exports.getWorkshop = asyncHandler(async (req, res) => {
    console.log(req.user);
    const result = await BookWorkshop.find()
    res.status(200).json({ messsge: "workshop fetch success", result })
})
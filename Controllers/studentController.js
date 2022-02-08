const mongoose = require('mongoose')
const STUDENT = mongoose.model('studnetData')
const fs = require('fs')
const nodemailer = require('nodemailer');

exports.student = {
    clondeep: (array) => {
        return JSON.parse(JSON.stringify(array))
    },
    GetAll: async (req, res) => {
        const studentlist = await STUDENT.find({})
        return res.json({
            isSuccess: true,
            data: this.student.clondeep(studentlist)
        })
    },
    add: async (req, res) => {
        const studentList = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            password: req.body.password,
            confrimpassword: req.body.confrimpassword
        }

    const folderpath = this.student.Filepath()
let mailBody = fs.readFileSync(`${folderpath}/EmailTemplate.html`,'utf8');
        mailBody = mailBody.replace('##FristName##', studentList.firstName);
        mailBody = mailBody.replace('##LastName##', studentList.lastName);
        mailBody = mailBody.replace('##PhoneNumber##', studentList.phone);
        mailBody = mailBody.replace('##Name##', studentList.UserName);
        mailBody = mailBody.replace('##PassWorld##', studentList.password);
        mailBody = mailBody.replace('##Email##', studentList.email);
const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'testingproject90@gmail.com',
                pass: 'Testing@123',
            },
        });
        const mailOptions = {
            from: 'bhautikmerndevelopers@gmail.com',
            to: 'bhautikmerndevelopers@gmail.com',
            subject: "Test Email",
            html: mailBody,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({
                    isSuccess: false,
                    message: error
                })
            } else {
                return res.json({
                    isSuccess: true,
                    message: "Email send successfully"
                })
            }
        })

        const isCreated  = await STUDENT.create(studentList)
        if(!isCreated)
        {
            return res.json({
                isSuccess: false,
                massage: "Student Add to Fail",
            })
        }
        return res.json({
            isSuccess: true,
            massage: "Student Add successfully",
        })
    },
    update: async (req, res) => {
        const student = await STUDENT.findById({_id: req.body.id})
        if(!student){
            return res.json({
                massage: "student not fond"
            })
        }
        const isUpdate = await STUDENT.findOneAndUpdate({_id: req.body.id}, student)
        if(!isUpdate){
            return res.json({
                massage: "student update fail"
            })
        }
        return res.json({
            massage: "student update successfully"
        })
        
    },
    delete: async (req, res) => {
        const student = await STUDENT.findById({_id: req.body.id})
        if(!student){
            return res.json({
                massage: "student not fond"
            })
        }
        const isdeleted = await STUDENT.findOneAndDelete({_id: req.body.id}, student)
        if(!isdeleted){
            return res.json({
                massage: "student delete fail"
            })
        }
        return res.json({
            massage: "student delete successfully"
        })
    },
    getById : async (req,res) => {
        let studentData = await STUDENT.findOne({ _id: req.body.id })
        console.log(studentData);
        if(!studentData){
            return res.json({
                isSuccess : false,
                message : "Data not found !"
            })
        }
        return res.json({
            isSuccess : true,
            data : this.student.clondeep(studentData)
        })
    },
    login: async function (req, res) {
        try {
            let userInfo = await USER.findOne({
                email: req.body.email,
            });
            if (userInfo) {
                if (req.body.password !== userInfo.password) {
                    return badRequestResponse(res, {
                        message: "Authentication failed. Wrong password.",
                    });
                }
                userInfo = JSON.parse(JSON.stringify(userInfo));
                delete userInfo["password"];
                // create a token
                var token = jwt.sign(userInfo, process.env.secret, {
                    expiresIn: "24h", // expires in 24 hours
                });
                return res.json({
                    isSuccess: true,
                    data: {
                        message: "You are logged in successfully!",
                        token,
                        userInfo,
                    }
                })
            }
            return res.json({
                isSuccess: false,
                data: {
                    message: "Email not found!",
                }
            })
        } catch (error) {
            return res.json({
                isSuccess: false,
                error
            })
        }
    },
    Filepath: () => {
        const baseDirectory = __dirname;
        const splitDir = baseDirectory.split('\\');
        splitDir.pop();
        const path = splitDir.join('/') + '/templates/';

         return path
    }
}
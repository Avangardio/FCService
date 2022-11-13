


const bcrypt = require("bcrypt");
const User   = require('../components/db/userModel');
const Page = require("../components/db/pageModel");





class accountController {



   async register (request, response) {

       const {email, password} = request.body;

       try {
       let hashedPassword = await  bcrypt.hash(password, 10);
       let newId = await User.estimatedDocumentCount();

       const user = new User({
                   email: email,
                   password: hashedPassword,
                   uId: "id" +  newId,
               });
               // save the new user

                let userData = await user.save();
                request.session.user = user.uId;
                response.status(201).send({
                    message: "Успешно",
                    userData,
                });

        }
            // catch error if the new user wasn't added successfully to the database
           // catch error if the password hash isn't successful
           catch(error) {
               response.status(500).send({
                   message: "Ошибка",
                   error,
               });
           };

   };

       async login(request, response) {
           const {email, password} = request.body;
           try {
               const user = await User.findOne({email: email});
               const page = await Page.findOne({uId: user.uId});
               await User.checkPassword(password, user.password)
                   .then((passwordCheck) => {
                       if (!passwordCheck) {
                           throw new Error("Неверный пароль.")
                       }
                       request.session.user = user.uId;
                       request.session.save(function (err) {
                           if (err) console.log(err);
                       });

                       response.status(200).send({
                           message: 'Успех',
                           registrationCompleted: page ? true : false,
                           user: user.uId
                       });
                   });
           }
           catch (error){
               console.log(error)
               response.status(403).send({
                   message: error.message,
               });
           };
       }

       async logout(request, response){
           request.session.destroy;
           response.clearCookie("connect.sid");
           response.status(200).send({
                      message: 'Logout completed'
                  })


       }

        async auth(request, response) {
            const pageExist = await Page.findOne({uId: request.session.user});

            response.status(200).send({
                message: 'Authentication Success',
                uId:    request.user,
                myPage: pageExist ? true : false
            })


        }

   }
module.exports = new accountController();
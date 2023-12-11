// getting-started.js
const express = require('express');
const app = express();
const nodemailer=require('nodemailer');
  /////////////
app.use(express.urlencoded());
app.use(express.json());
const cors = require('cors');
const port = 74;
app.use(cors());
const path = require('path');
const mongoose = require('mongoose');
const { URL } = require('url');
const { json } = require('express');
const { Auth , LoginCredentials } = require("two-step-auth");
LoginCredentials.mailID = "pashampavan201@gmail.com"; 
LoginCredentials.password = "Pavan02@"; 
LoginCredentials.use = true;
const db = 'mongodb+srv://pashampavan:Pavan02@cluster0.bizzz4b.mongodb.net/mini?retryWrites=true&w=majority';
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("connected")
}).catch((err) => {
    console.log("erroe occured")
});
var KittySchema = new mongoose.Schema({
    name:{type:String,require:true},
    email: {type:String,require:true},
    date: {type:String,require:true},
    rollNo: {type:String,require:true,unique:true},
    password: {type:String,require:true},
    savings: {type:Number,require:true},
    history: {type:Array,required:false},
    orders: {
        "canteen": [],
        "stationary": [],
        "juicePoint": []
    },
    order: {type:Array,required:false}
})
var Kitten = mongoose.model('pavan', KittySchema);
function transfer() {
    const btn3 = document.getElementById("btn3");
    const btn4 = document.getElementById("btn4");
    const btn6 = document.getElementById("btn6");
    const btn8 = document.getElementById("btn8");
    const btn10 = document.getElementById("btn10");
    // const btn12=document.getElementById("btn12");
    const btn5 = document.getElementById("btn5");
    const btn7 = document.getElementById("btn7");
    const btn9 = document.getElementById("btn9");
    // const btn11=document.getElementById("btn11");
    btn6.style.display = "none";
    btn8.style.display = "none";
    btn10.style.display = "none";
    // btn12.style.display="none";
    btn5.style.display = "block";
    btn7.style.display = "block";
    btn9.style.display = "block";
    // btn11.style.display="block";
    // console.log("enterd")
    btn3.style.display = "none";
    btn4.style.display = "block";

}
app.get('/log', (req, res) => {
    console.log("i am pavan")
    res.status(200).render('front.pug');
})
app.get('/', (req, res) => {
    console.log("i am pavan")
    res.status(200).json({"pa":"pavam"});
})
app.get('/login', (req, res) => {
    console.log("i am pavan")
    res.status(200).render('login.pug', { "c": "0" });
})
app.get('/signup', (req, res) => {
    console.log("i am pavan")
    res.status(200).render('signup.pug');
})
app.post('/sign',async (req, res) => {
    var temp = new Kitten(req.body);
    temp["savings"] = 300;
    // temp["orders"]={"canteen":[],"stationary":[],"juicePoint":[]};
    temp["orders"] = {
        "canteen": [],
        "stationary": [],
        "juicePoint": []
    }
    var s = 0;
    const user=await Kitten.findOne({"email":req.body.email});
    if(user)
    {
        return res.status(200).json({"success":false,"msg":"Already has account with this email. "});
    }
    const user2=await Kitten.findOne({"email":req.body.rollNo});
    if(user2)
    {
        return res.status(200).json({"success":false,"msg":"Already has account with this roll numberś. "});
    }
    temp.save(function (err, temp) {
        if (err) return res.status(200).json({"success":false,"msg":"Error in server."});
        console.log(temp);
        res.status(200).json({"success":true,"user":temp});
    })
})
app.post('/loginAccount', async (req, res) => {
    console.log(req.body);
    let success = false;
    const kittens = await Kitten.findOne(req.body);
    // if(err) return console.log("error occured")
    console.log(kittens)
    try {
        if (kittens) {
            success = true;
            if (kittens.name === "canteen" || kittens.name === "stationary" || kittens.name === "juicePoint") {
                // res.status(200).render('account2.pug',kittens);
                res.status(400).json({ "success": success, "user": kittens });
            }
            else {
                // res.status(200).render('account.pug',kittens);
                res.status(400).json({ "success": success, "user": kittens });
            }
        }
        else {
            // res.status(200).render('login.pug',kittens);
            res.status(400).json({ "success": success, "user": kittens });
        }
    } catch (err) {
        res.status(404).json({ "success": success, "user": kittens });
    }
})
app.post('/canteen', (req, res) => {
    let paramString = req.url.split('?')[1];
    let q = new URLSearchParams(paramString);
    // console.log(q)
    res.status(200).render('canteen.pug', { "rollNo": q.get("rollNo"), "password": q.get("password") });
})
app.post('/stationary', (req, res) => {
    let paramString = req.url.split('?')[1];
    let q = new URLSearchParams(paramString);
    // console.log(q)
    res.status(200).render('stationary.pug', { "rollNo": q.get("rollNo"), "password": q.get("password") });
})
app.post('/juicePoint', (req, res) => {
    let paramString = req.url.split('?')[1];
    let q = new URLSearchParams(paramString);
    // console.log(q)
    res.status(200).render('juicePoint.pug', { "rollNo": q.get("rollNo"), "password": q.get("password") });
})
app.post('/transfer2', (req, res) => {
    let paramString = req.url.split('?')[1];
    let q = new URLSearchParams(paramString);
    res.status(200).render('transfer.pug', { "rollNo": q.get("rollNo"), "password": q.get("password") });
})
app.post('/transfer', (req, res) => {
    let c = 0;
    let s = false;
    let paramString = req.url.split('?')[1];
    let q = new URLSearchParams(paramString);
    console.log(req.body.amount)
    console.log(req.body.pass + " " + q.get("password"));
    let date1 = new Date();
    let date = date1.getHours() + ":" + date1.getMinutes() + "   " + date1.getDay() + "-" + date1.getDate() + "-" + date1.getFullYear();
    if (req.body.pass === q.get("password")) {
        Kitten.findOne({ "rollNo": q.get("rollNo"), "password": q.get("password") }, (err, kittens1) => {
            if (err) return console.log("error")
            if ((kittens1.savings - parseInt(req.body.amount)) <= 0) {
                console.log(kittens1.savings);
                console.log("less");
                c = 1;
                return res.status(200).json({ "success": false });
            }
            console.log(kittens1)
            console.log(kittens1.savings)
            console.log(parseInt(req.body.amount))
            let temp1 = kittens1.savings - parseInt(req.body.amount);
            let temp4 = kittens1.history;
            Kitten.findOne({ "rollNo": req.body.roll }, (err, kittens2) => {
                if (err) res.status(200).json({ "success": s });
                if (!kittens2) {
                    return res.status(200).json({ "success": s })
                }
                console.log(kittens2);
                console.log(kittens2.savings)
                console.log(parseInt(req.body.amount))
                let temp2 = kittens2.savings + parseInt(req.body.amount);
                let temp5 = kittens2.history;
                temp5.push({ "type": "received from", "price": req.body.amount, "time": date, "name": kittens1.name });
                Kitten.updateOne({ "rollNo": req.body.roll }, { $set: { "savings": temp2, history: temp5 } }, (err, kittens) => {
                    if (err) return res.status(200).json({ "success": s })
                    console.log("updated")
                })
                temp4.push({ "type": "send to", "price": req.body.amount, "time": date, "name": kittens2.name });
                Kitten.updateOne({ "rollNo": q.get("rollNo"), "password": q.get("password") }, { $set: { "savings": temp1, history: temp4 } }, (err, kittens) => {
                    if (err) return res.status(200).json({ "success": s })
                    console.log("updated")
                
                    if (c == 0) {
                        s = true;
                        console.log("true transactions");
                        return res.status(200).json({ "success": s })
                    }
                })

            })

        })

    }
    else {
        console.log("password incorect");
        return res.status(200).json({ "success": s });
    }
})
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pashampavan02@gmail.com',
      pass: 'plvhiqrcqzgrhphe'
    }
  });
app.post('/otp',async (req,res)=>{
    console.log(req.body.email);
    //////////////
        let email=req.body.email;
        let x = Math.floor((Math.random() * 9999) + 1000);
          var mailOptions = {
            from: 'pashampavan02@gmail.com',
            to: `${email}`,
            subject: 'OTP:',
            text: `your otp to create an account in in bank of vasavi is ${x}`
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.status(200).json({"success":false})
            } else {
                // let i=JSON.parse(info);
              console.log('Email sent: ' +JSON.stringify(info));
              return res.status(200).json({"otp":`${x}`,"success":true})
            }
          });
          //////////////////
})
app.post('/buy', (req, res) => {
    let paramString = req.url.split('?')[1];
    let q = new URLSearchParams(paramString);
    // console.log(q);
    // console.log("done")
    let rollNo = q.get("rollNo");
    let password = q.get("password");
    // console.log(rollNo);
    // console.log(password);
    // console.log(q.get("price"));
    // console.log(parseInt(q.get("price")));
    Kitten.findOne({ "rollNo": rollNo, "password": password }, (err, kittens) => {
        if (err) return console.log(err);
        // console.log(kittens)
        var letters = "0123456789ABCDEF";
        var color = '#';
        for (var i = 0; i < 6; i++)
            color += letters[(Math.floor(Math.random() * 16))];
        // console.log(kittens["savings"])
        let temp0 = kittens.savings - parseInt(q.get("price"));
        let temp3 = kittens.orders;
        let temp4 = kittens.history;
        console.log("checking");
        // console.log(kittens.orders);
        // console.log(temp3["canteen"]);
        // console.log(temp3);
        let date1 = new Date();
        let date = date1.getHours() + ":" + date1.getMinutes() + "   " + date1.getDay() + "-" + date1.getDate() + "-" + date1.getFullYear();
        if (q.get("div") === "C") {
            console.log("enterde     .....");
            try
            {

                temp3["canteen"].push({ "item": q.get('item'), "price": q.get("price"), "id": color, "name": kittens.name, "rollNo": kittens.rollNo });
                temp4.push({ "type": "send to", "price": q.get("price"), "time": date, "name": "canteen" });
                Kitten.findOne({ "name": "canteen", "password": "C@02" }, (err, kittens1) => {
                    console.log("canteen");
                    // console.log(kittens1);
                    let temp = kittens1.order;
                    let temp9 = kittens1.history;
                    temp9.push({ "type": "recieved from", "price": q.get("price"), "time": date, "name": kittens.name });
                    temp.push({ "item": q.get("item"), "price": q.get("price"), "id": color, "name": kittens.name, "rollNo": kittens.rollNo });
                    let temp5 = kittens1.savings + parseInt(q.get("price"));
                    Kitten.updateOne({ "name": "canteen", "password": "C@02" }, { $set: { order: temp, savings: temp5, history: temp9 } }, (err, kittens2) => {
                        if (err) return res.status(200).json({"success":false,"error":err})
                        console.log(temp);
                        console.log(temp3);
                        console.log(temp4);
                        Kitten.updateOne({ "rollNo": rollNo, "password": password }, { $set: { "savings": temp0, "orders": temp3, "history": temp4 } }, (err, kittens3) => {
                            if (err) return res.status(200).json({"success":false,"error":err})
                            res.status(200).json({"success":true})
                        })
                })
                });
            }catch(err)
            {
                res.status(200).json({"success":false,"error":err})
            }
        }
        else if (q.get("div") === "S") {
            console.log("enterde     ..... S");
            temp3["stationary"].push({ "item": q.get('item'), "price": q.get("price"), "id": color , "name": kittens.name, "rollNo": kittens.rollNo });
            temp4.push({ "type": "send to", "price": q.get("price"), "time": date, "name": "stationary" });
            Kitten.findOne({ "name": "stationary", "password": "S@02" }, (err, kittens1) => {
                console.log(kittens1);
                let temp = kittens1.order;
                temp.push({ "item": q.get("item"), "price": q.get("price"), "id": color ,"name": kittens.name,"rollNo": kittens.rollNo });
                let temp5 = kittens1.savings + parseInt(q.get("price"));
                let temp9 = kittens1.history;
                temp9.push({ "type": "recieved from", "price": q.get("price"), "time": date, "name": kittens.name });
                Kitten.updateOne({ "name": "stationary", "password": "S@02" }, { $set: { order: temp, savings: temp5, history: temp9 } }, (err, kittens2) => {
                    if (err) return res.status(200).json({"success":false,"error":err})
                    Kitten.updateOne({ "rollNo": rollNo, "password": password }, { $set: { "savings": temp0, "orders": temp3, "history": temp4 } }, (err, kittens3) => {
                        if (err) return res.status(200).json({"success":false,"error":err})
                        res.status(200).json({"success":true})
                })
            })

            });
            // res.status(200).render('transaction.pug', { "rollNo": q.get("rollNo"), "password": q.get("password"), "amt": q.get("price"), "id": color },);
        }
        else if (q.get("div") === "J") {
            console.log("enterde     ..... J");
            temp3["juicePoint"].push({ "item": q.get('item'), "price": q.get("price"), "id": color , "name": kittens.name, "rollNo": kittens.rollNo });
            temp4.push({ "type": "send to", "price": q.get("price"), "time": date, "name": "juicePoint" });
            Kitten.findOne({ "name": "juicePoint", "password": "J@02" }, (err, kittens1) => {
                let temp = kittens1.order;
                console.log(kittens1.order);
                temp.push({ "item": q.get("item"), "price": q.get("price"), "id": color ,"name": kittens.name,"rollNo": kittens.rollNo  });
                let temp5 = kittens1.savings + parseInt(q.get("price"));
                let temp9 = kittens1.history;
                temp9.push({ "type": "recieved from", "price": q.get("price"), "time": date, "name": kittens.name });
                Kitten.updateOne({ "name": "juicePoint", "password": "J@02" }, { $set: { order: temp, savings: temp5, history: temp9 } }, (err, kittens2) => {
                    if (err) return console.log("error in J")
                    Kitten.updateOne({ "rollNo": rollNo, "password": password }, { $set: { "savings": temp0, "orders": temp3, history: temp4 } }, (err, kittens3) => {
                        if (err) return console.log("error in update");
                        res.status(200).json({"success":true})
                })
            })


            });
            // res.status(200).render('transaction.pug', { "rollNo": q.get("rollNo"), "password": q.get("password"), "amt": q.get("price"), "id": color },);
        }

    })
})
app.get('/orders', (req, res) => {
    let s = req.url.split("?")[1];
    let q = new URLSearchParams(s);
    let rollNo = q.get("rollNo");
    let password = q.get("password");
    
    Kitten.findOne({ "rollNo": rollNo, "password": password }, (err, kittens) => {
        if (err) return console.log("error in findiing");
        console.log(kittens);
        console.log("done");
        console.log(kittens.name);
        console.log(kittens.orders.canteen);
        console.log(kittens.orders.stationary);
        console.log(kittens.orders.juicePoint);
        if (kittens.name === "canteen" || kittens.name === "stationary" || kittens.name === "juicePoint") {
            res.status(200).render("orders2.pug", { "order": kittens.order });
        }
        else {
            res.status(200).render("orders.pug", { "canteen": kittens.orders.canteen, "stationary": kittens.orders.stationary, "juicePoint": kittens.orders.juicePoint, "password": kittens.password, "rollNo": kittens.rollNo });
        }

    })
})
app.post('/delete', (req, res) => {
    let s = req.url.split("?")[1];
    let q = new URLSearchParams(s);
    console.log("we are in accept"+req.body.id);
    try
    {

        if (q.get("name") === "canteen") {
            Kitten.findOne({ "rollNo": q.get("rollNo"), "password": q.get("password") }, (err, kittens) => {
    
                let y = kittens.orders;
                // console.log(x);
                console.log(" ..." + req.body.id);
                y["canteen"] = y["canteen"].filter(p => p.id != req.body.id)
                Kitten.updateOne({ "rollNo": q.get("rollNo"), "password": q.get("password") }, { $set: { "orders": y } }, (err, kitten) => {
                    if (err) return console.log("error in update")
                })
                Kitten.findOne({ "name": "canteen" }, (err, kittens2) => {
                    let z = kittens2.order;
                    z = z.filter(p => p.id != req.body.id);
                    Kitten.updateOne({ "name": "canteen" }, { $set: { "order": z } }, (err, kitt) => {
                        if (err) return console.log("error in update")
                        res.status(200).json({"success":true});
                    });
                });
    
                // res.status(200).render("orders.pug", { "canteen": kittens.orders.canteen, "stationary": kittens.orders.stationary, "juicePoint": kittens.orders.juicePoint });
               
            })
        }
        else if (q.get("name") === "stationary") {
            Kitten.findOne({ "rollNo": q.get("rollNo"), "password": q.get("password") }, (err, kittens) => {
    
                let y = kittens.orders;
                // console.log(x);
                console.log(" ..." + req.body.id);
                y["stationary"] = y["stationary"].filter(p => p.id != req.body.id)
                Kitten.updateOne({ "rollNo": q.get("rollNo"), "password": q.get("password") }, { $set: { "orders": y } }, (err, kitten) => {
                    if (err) return console.log("error in update")
                })
                Kitten.findOne({ "name": "stationary" }, (err, kittens2) => {
                    let z = kittens2.order;
                    z = z.filter(p => p.id != req.body.id);
                    Kitten.updateOne({ "name": "stationary" }, { $set: { "order": z } }, (err, kitt) => {
                        if (err) return console.log("error in update")
                        res.status(200).json({"success":true});
                    });
                });
    
                // res.status(200).render("orders.pug", { "canteen": kittens.orders.canteen, "stationary": kittens.orders.stationary, "juicePoint": kittens.orders.juicePoint });
            })
        }
        else {
            Kitten.findOne({ "rollNo": q.get("rollNo"), "password": q.get("password") }, (err, kittens) => {
    
                let y = kittens.orders;
                // console.log(x);
                console.log(" ..." + req.body.id);
                y["juicePoint"] = y["juicePoint"].filter(p => p.id != req.body.id)
                Kitten.updateOne({ "rollNo": q.get("rollNo"), "password": q.get("password") }, { $set: { "orders": y } }, (err, kitten) => {
                    if (err) return console.log("error in update")
                })
                Kitten.findOne({ "name": "juicePoint" }, (err, kittens2) => {
                    let z = kittens2.order;
                    z = z.filter(p => p.id != req.body.id);
                    Kitten.updateOne({ "name": "juicePoint" }, { $set: { "order": z } }, (err, kitt) => {
                        if (err) return console.log("error in update")
                        res.status(200).json({"success":true});
                    });
                });
    
                // res.status(200).render("orders.pug", { "canteen": kittens.orders.canteen, "stationary": kittens.orders.stationary, "juicePoint": kittens.orders.juicePoint });
                
            })
        }
    }catch(err)
    {
        res.status(200).json({"success":false,"error":err});
        
    }
})

app.listen(port, () => {
    console.log("running");

})

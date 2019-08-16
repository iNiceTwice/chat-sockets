const express = require("express")
const path = require("path")
const routes = require("./routes/routes.js")
const socketIO = require("socket.io")
const app = express()

//middlewares
app.use(express.urlencoded({ extended: false }))//change to true
app.use(express.json())

//static files
app.use(express.static(path.join(__dirname,"public")))

//routes
app.use("/", routes)

//server settings
app.set("port", process.env.PORT || 3000)
const server = app.listen(app.get("port"),()=>{console.log("- Server Online -")})

const io = socketIO(server)

let users = []

io.on("connection", socket =>{
    console.log("New user connected", socket.id)
    
    socket.on("send:nickname", nickname=>{
        socket.nickname = nickname
        users.push(socket.nickname)
        updateUsersList()
        socket.broadcast.emit("send:mssg", {username:"",message:`${nickname} entró`})
    })
    socket.on("send:mssg", mssg =>{
        io.sockets.emit("send:mssg", mssg)
    })
    
    socket.on("disconnect", () =>{
        users.splice(users.indexOf(socket.nickname),1)
        updateUsersList()
        socket.broadcast.emit("user:disconnect", socket.nickname)
        if(socket.nickname) io.sockets.emit("send:mssg", {username:"",message:`${socket.nickname} se fué`})
       
    })
    const updateUsersList = () =>{
        io.sockets.emit("get:users", users)
    }
})

const express= require("express")
const cors = require("cors")
const pg = require("pg") 
const dotenv =require("dotenv")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const cookieParser=require("cookie-parser")

const app = express()
dotenv.config()

//getting all the secrets
const PORT=process.env.PORT
const USER=process.env.USER
const HOST=process.env.HOST
const DATABASE=process.env.DATABASE
const PASSWORD=process.env.PASSWORD
const DATABASEPORT=process.env.DATABASEPORT
const JWT_SECRET=process.env.JWT_SECRET
const URL=process.env.URL

//setting up the database
const db=new pg.Client({
    user:USER,
    host:HOST,
    database:DATABASE,
    password:PASSWORD,
    port:DATABASEPORT,
    // ssl:true
})
db.connect()

//encryption setup
const algorithm = process.env.ALGORITHM;
const secretKey = Buffer.from(process.env.SECRETKEY,'hex'); 
const iv = Buffer.from(process.env.IV,'hex');

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted
}

// Decrypt
function decrypt(encryptedData) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    iv
  );
  let decrypted = decipher.update(encryptedData,'hex','utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Authentication
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token)   
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or Expired Token' });

        req.user = user;
        next();
    });
};

//using cors to allow my front end to talk to my backend

app.use(cors({
  origin: URL, 
  credentials: true
}));

app.use(cookieParser());

//just a body-parser
app.use(express.json())

app.get("/userId/check", authenticateToken, (req, res) => {
  res.sendStatus(200); // or res.json({ user: req.user });
});

app.post("/register",async(req,res)=>{
    const username=req.body.Username.username
    const passwordTemp=req.body.Password.password
    const response=await db.query("SELECT * from users WHERE username=($1) ",
        [username]
    )
    if(response.rows.length!=0)
    {
        res.send("Bad Credentials")
    }
    else if(username=="" || passwordTemp=="")
    {
        res.send("Bad Credentials")
    }
    else
    {
        const date=new Date().getTime();
        const password=encrypt(passwordTemp);

        const token = jwt.sign({username: username},JWT_SECRET,{ expiresIn: '10m' });
        res.cookie("token", token, { httpOnly: true });


        db.query("Insert INTO users(username,password) VALUES($1,$2)",
            [username,password]
        ).then(
            await db.query("INSERT into times(username,times) VALUES($1,$2)",
            [username,date]
            )
        ).then(
            db.query("Insert INTO Cards(username,times,activity,emoji,done,total,checked) VALUES($1,$2,$3,$4,$5,$6,$7)",
                [username,date,'WORKOUT','&#127947;',0,1,0])
            .then(
                db.query("Insert INTO Cards(username,times,activity,emoji,done,total,checked) VALUES($1,$2,$3,$4,$5,$6,$7)",
                    [username,date,'MEDITATION','&#129496;',0,1,0])
            )
            .then(
                db.query("Insert INTO Cards(username,times,activity,emoji,done,total,checked) VALUES($1,$2,$3,$4,$5,$6,$7)",
                    [username,date,'SHOWER','&#x1f6bf;',0,1,0])
            )
            .then(
                db.query("Insert INTO Cards(username,times,activity,emoji,done,total,checked) VALUES($1,$2,$3,$4,$5,$6,$7)",
                    [username,date,'DIET','&#127821;',0,1,0])
            )
        )
        .then(res.send("OK"))
        .catch(err=>console.log(err))
        
    }
   
})

app.post("/login",async (req,res)=>{
    const username=(req.body.Username.username)
    const password=req.body.Password.password
    const response=await db.query("SELECT * from users WHERE username=($1) ",
        [username]
    )
    if(response.rows.length==0)
    {
        res.send("Wrong Username")
    }
    else
    {
        const true_pass=decrypt(response.rows[0].password)
        if(password==true_pass)
        {
            
            const token = jwt.sign({username: username},JWT_SECRET,{ expiresIn: '10m' });
            res.cookie("token", token, { httpOnly: true });
            res.send("OK");
        }
        else
        {
            res.send("Wrong Password");
        }
    }
})

app.get("/getTime/:username",authenticateToken,async (req,res)=>{
    const username=req.params.username;
    const date=await db.query("Select times from times where username=$1 ",
        [username]
    );
    res.json(date.rows[0]);
})

app.get("/getCards/:username",async (req,res)=>{
    const date=new Date().getTime();
    const username=req.params.username;
    const data=await db.query("Select * from Cards where username=$1 ORDER BY id ASC",
        [username]
    ).then(res=>res.rows)
    
    let diff=Math.abs(((date-Math.abs(data[0].times))/1000).toFixed(0));
    diff=Math.floor(diff/86400);
    if(diff>=1)
    {   
        db.query("UPDATE Cards SET total=total+($4) , times=($3) , checked=($1) where username=($2)",
            [0,username,date,diff]
        ).then(
            db.query("Select * from Cards where username=($1) ORDER BY id ASC",
                [username]
            ).then((data)=>res.json(data.rows))
        )        
    }
    else
    {
        res.json(data)
    }
})

//changing the data on the basis of checkbox
app.post('/changeCards/:username/:activity',authenticateToken,async (req,res)=>{
    const {username,activity}=req.params;
    const data=req.body.Checked.data
    if(data)
    {
        await db.query("UPDATE Cards SET checked=($1), done=done+1 where username=($2) and activity=($3)",
        [1,username,activity]
    )}
    else
    {
        await db.query("UPDATE Cards SET checked=($1), done=done-1 where username=($2) and activity=($3)",
        [0,username,activity]
    )
    }
    res.json("Ayush");
})

//getting the Tasks
app.get('/getTasks/:username/:Timely',authenticateToken,async (req,res)=>{
    let {username,Timely}=req.params;
    Timely=`${Timely}tasks`
    const data =await db.query(`Select id,tasks from ${Timely} where username=($1) order by id ASC`,
        [username]
    )
    res.json(data.rows)
})
//adding the task
app.post('/addTasks/:username/:Timely',authenticateToken,async (req,res)=>{
    let {username,Timely}=req.params;
    const data=req.body.task
    Timely=`${Timely}tasks`
    db.query(`Insert Into ${Timely} (username,tasks) values($1,$2)`,
        [username,data]
    )
    const id=await db.query(`Select id from ${Timely} where username=($1) and tasks=($2)`,
        [username,data]
    )
    return res.json({id:id.rows});
})
//delete the task
app.get('/deleteTasks/:Timely/:id',authenticateToken,async (req,res)=>{
    let {Timely,id}=req.params;
    Timely=`${Timely}tasks`
    await db.query(`Delete from ${Timely} where id=($1)`,
        [id]
    )
    res.json("Deleted")
})

//updating the task
app.post('/updateTasks/:Timely/:id',authenticateToken,async (req,res)=>{
    let {Timely,id}=req.params;
    Timely=`${Timely}tasks`
    const data=req.body.text
    await db.query(`UPDATE ${Timely} SET tasks=($1) where id=($2)`,
        [data,id]
    )
    res.json("Updated")
})

//adding the notes  
app.post('/addNotes/:Timely/:id',authenticateToken,async (req,res)=>{
    let {Timely,id}=req.params;
    Timely=`${Timely}tasks`
    const data=req.body.text
    await db.query(`UPDATE ${Timely} SET note=($1) where id=($2)`,
        [data,id]
    )
    res.json("Updated")
})

//getting the notes
app.get('/getNotes/:Timely/:id',authenticateToken,async (req,res)=>{
    let {Timely,id}=req.params;
    Timely=`${Timely}tasks`
    const data=await db.query(`Select note from ${Timely} where id=($1)`,
        [id]
    )
    res.json(data.rows[0])
})

//adding the log
app.post('/addLog/:username',authenticateToken,async (req,res)=>{
    const {username}=req.params;
    const {date,mood,journal}=req.body
    const encryptedJournal=encrypt(journal);
    await db.query("Insert into FocusLog(username,date,mood,logs) values($1,$2,$3,$4)",
        [username,date,mood,encryptedJournal]
    )
    res.json("OK")
})

//getting the log
app.get('/getLog/:username/:date',authenticateToken,async (req,res)=>{
    const {username,date}=req.params;
    const data=await db.query("Select * from FocusLog where username=($1) and date=($2)",
        [username,date]
    )
    if(data.rowCount>0)
    {
        const journal=decrypt(data.rows[0].logs)
        data.rows[0].logs=journal
    }
    res.json(data.rows)
})

//getting the blog
app.get('/getBlogs',authenticateToken,async (req,res)=>{
    const data=await db.query("Select * from Blogs order by id desc")
    res.json(data.rows)
})

//adding the blog
app.post('/addBlog',authenticateToken,async (req,res)=>{
    const {id,author,content,timestamp,likes}=req.body.Blog
    
    await db.query("Insert into Blogs(id,author,content,times) values($1,$2,$3,$4)",
        [id,author,content,timestamp]
    )
    res.json("OK")
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}!`)
})
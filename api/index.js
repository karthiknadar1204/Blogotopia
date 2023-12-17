const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const User=require('./models/User');
const Post=require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const multer=require('multer');
const path = require('path');
const fs=require('fs');

// const uploadMiddleware = multer({ dest: 'uploads/' })
// const uploadMiddleware = multer({ dest: path.join(__dirname, 'uploads') });

const uploadMiddleware = multer({ dest: path.join(__dirname, 'uploads') });

const app=express();

const secret='sdihbd8egeuivb937rbri';

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

(async () => {
    try {
      await mongoose.connect('mongodb+srv://karthiknadar1204:GJHc5gYVX4F1RAUN@cluster0.scmpzlc.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  })();


  app.post('/register', async (req, res) => {
    const { Username, password } = req.body;
  
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const userDoc = new User({ Username, password: hashedPassword });
      await userDoc.save();
  
      res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error registering user:', error);
  
      res.status(400).json({ error: 'Registration failed. Please try again.' });
    }
  });


  app.post('/login',async(req,res)=>{
    const { Username, password } = req.body;
    const userDoc = await User.findOne({ Username });
    if (!userDoc) {
        return res.status(404).json({ message: "User not found" });
    }
    const passwordCorrect = await bcrypt.compare(password, userDoc.password);
    if(passwordCorrect){
        jwt.sign({Username,id:userDoc._id},secret,{},(err,token)=>{
            if(err){
                throw err
            }
            res.cookie('token',token).json({
                id:userDoc._id,
                Username
            });
        })
    }
  })

  app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) {
          return res.status(401).json({ message: 'Invalid token' });
      }
      res.json(info);
  });
  
  })

  app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });

  app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    try {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
      const { token } = req.cookies;
      jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
          throw err;
        }
        const { title, summary, content } = req.body;
        const postDoc = await new Post({
          title,
          summary,
          content,
          cover: newPath,
          author:info.id
        });
        const savedPost = await postDoc.save();
        res.json({ postDoc, userInfo: info });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  app.get('/post',async (req,res)=>{
    const posts=await(Post.find().populate('author',['Username']).sort({createdAt:-1}).limit(20))
    res.json(posts);
  })

  app.get('/post/:id', async (req,res)=>{
    const {id}=req.params;
    const postDoc=await Post.findById(id);
    res.json(postDoc);
  })

  app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;
    if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {id,title,summary,content} = req.body;
      const postDoc = await Post.findById(id);
      
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }
      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });
      res.json(postDoc);
    });
  });

  app.get('/profileinfo/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const posts = await Post.find({ author: id });
      res.json(posts);
    } catch (error) {
      console.error('Error fetching profile info:', error);
      res.status(500).json({ error: 'An error occurred while fetching posts.' });
    }
  });
  

  
app.listen(4000, () => {
    console.log('Server is running on port 4001');
  });


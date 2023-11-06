const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const key = 'shivamkaleisgoodboy'
const { DataTypes } = require('sequelize');
const { json } = require('body-parser');
app.use(express.json());

const sequelize = new Sequelize('mydb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const formData = sequelize.define('formData', {
    question: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option3: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option4: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const userAuthTable = sequelize.define('userAuthTable', {
    FullName: {
        type: DataTypes.STRING
    },
    Email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING
    }
});

formData.sync()
    .then(() => {
        console.log('Table created successfully');
    })
    .catch((err) => {
        console.error('Error creating table:', err);
    });

app.post('/register', async (req, resp) => {
    const { FullName, Email, password } = req.body;
    try {
        const existingUser = await userAuthTable.findOne({ where: { Email } });
        if (existingUser) {
            resp.status(400).json({ message: 'Email has Already been Registered' })
        }
        else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await userAuthTable.create({
                FullName: FullName,
                Email: Email,
                password: hashPassword,
            });
            resp.json({ message: "User Register Successfully" });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        resp.status(500).send('Error creating user');
    }
});

app.post('/login', async (req, resp) => {
    const { Email, password } = req.body;
    const user = await userAuthTable.findOne(({ where: { Email } }));
    if (user) {
        const isPassword = await bcrypt.compare(password, user.password);
        if (isPassword) {
            const tokenPlayload = {
                FullName: user.FullName,
                userId: user.id,
                Email: user.Email,
            }
            const token = jwt.sign(tokenPlayload, key, { expiresIn: '3h' });
            await userAuthTable.update({ token: token }, { where: { Email } });
            const obj = {
                FullName: user.FullName,
                userId: user.id,
                Email: user.Email,
                token
            }
            resp.json({ message: "User Login SuccessFully", obj })
        }

    }
});
app.post('/logout', async (req, resp) => {
    const userId = req.body.id;
    const user = await userAuthTable.findOne({ where: { id: userId } });

    if (user) {
        if (user.token === null) {
            resp.json({ message: "User Already Logged Out" });
        } else {
            user.token = null;
            await user.save();

            const userObj = {
                userId: user.id,
                userName: user.FullName
            };

            resp.json({ message: "User Logout Successfully", userObj });
        }
    } else {
        resp.json({ message: `User Not Found with Id: ${userId}` });
    }
});

app.post('/addQuestion', async (req, resp) => {
    const { question, option1, option2, option3, option4 } = req.body;
    const questionSet = await formData.create({
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4
    });
    if (questionSet) {
        resp.json({ message: questionSet });
    } else {
        resp.json({ message: "Error Adding Data" })
    }
});

app.get('/getQuestion', async (req, resp) => {
    try {
        const question = await formData.findAll({});
        resp.json({ message: question });
    } catch (error) {
        console.error('Error getting a question:', error);
        resp.status(500).json({ message: "Error getting a question" });
    }
})

app.listen(6000, () => {
    console.log('Server is running on port 5000');
});

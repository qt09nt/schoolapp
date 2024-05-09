const express = require('express'); //importing the express package
const app = express(); //create a web application
const dfConfig = require('./config');  //Import DB config
const Student = require('./models/student');

app.use(express.json());

//home route
app.get('/', function(req, res){
    res.send('Hello World');
});

//Get all students
app.get('/students', function(req, res){
 
    let data = {where: {}};
 
    //Department filter
    if(req.query.department){
        data.where.department = req.query.department;
    }
 
    //Country filter
    if(req.query.country){
        data.where.country = req.query.country;
    }
 
    Student.findAll(data).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    })
});


//Create a new student
app.post('/students', function(req, res){
    Student.create(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

//Update student
//Update student
app.patch('/students/:student_id', function(req, res){
    const studentId = parseInt(req.params.student_id);
 
    //Find the student in the database
    Student.findByPk(studentId).then((result) => {
        if(result){
            //Update the student record
            Object.assign(result, req.body);
 
            result.save().then(() => {
                res.status(200).send(result);
            }).catch((err) => {
                res.status(500).send(err);
            });
        } else {
            res.status(404).send('Student not found');
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
});

//Delete student
app.delete('/students/:student_id', function(req, res){
    const studentId = parseInt(req.params.student_id);
 
    //Find the student in the database
    Student.findByPk(studentId).then((result) => {
        if(result){
            //Delete a student record
            result.destroy().then(() => {
                res.status(200).send(result);
            }).catch((err) => {
                res.status(500).send(err);
            });
        } else {
            res.status(404).send('Student not found');
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
});




//Web server 
app.listen(3000, function(){
    console.log('Server running on port 3000...');
});
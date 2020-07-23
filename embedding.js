const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/datarelation2';
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB Server : ', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema

  //if you want to set is as required, then use this
  // author: {
  //   type: authorSchema,
  //   required: true
  // }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

//how ever, if you decided to update the author's name, you can't update using the author id, in order
//to update the author name inside the author object inside corse document / object you need to update it
//using course id or parent id not the sub document id, let's take alook how to update it

//1. first use createCourse to create a course

createCourse('Node Course', new Author({ name: 'Mosh', bio: 'cool author', website: 'any website' }));

//2. cool, now check the mongodb compas to check the result and use listCourses to print the result in the console

//listCourses();

//3. you'll se the result, copy the course id to use it as a update parameter in the update function

//3. now, create a function to update the author name using course id

// async function updateAuthor(courseid, name){
//   const course = await Course.findById(courseid);
//   course.author.name = name;
//   course.save();
// }

//4. now, go to the terminal and chcek the result

//updateAuthor('5f18f6313ddd003d4c121ddc', 'Cool author2');

//another approach you can try is using update directly

// async function updateAuthor(courseid, name){
//   const course = await Course.updateOne( {_id: courseid}, {
//     $set: {
//       'author.name': name
//     }
//   });
// }

// updateAuthor('5f18f6313ddd003d4c121ddc', 'Jane Doe');

//but however, both have the same result

//Read more about nodejs update operator : https://docs.mongodb.com/manual/reference/operator/update/
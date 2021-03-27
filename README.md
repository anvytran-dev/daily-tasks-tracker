# daily-tasks-tracker

This is a full-stack appliaction where the user can create a to-do-list. They can check the tasks off once it is completed, remove completed tasks, and remove all tasks. Their is a counter which tracks how many tasks have been completed. 

Link to Project: https://daily-tasks-tracker.herokuapp.com/

![Project Image](/public/pic/project.png)


### How It's Made:

This project uses EJS, CSS, and JavaScript on the front-end and Node.js + Express.js, and MongoDB on the back-end. 

The user types out their task and submits it. This submission is sent as a request to the server. The details of their task is sent and stored to a database in MongoDB. Then, the server requests the data from the database, the data is sent as a response to the front-end so that the information can be rendered dyanmically through EJS. 


### Lesson Learned

I learned how to use CRUD functions to operate on stored data in MongoDB. Also, I learned how to use EJS, a simple templating language that allow us to generate HTML markup with Javascript.  
 

###

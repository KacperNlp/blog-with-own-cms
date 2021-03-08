# blog-with-own-cms
My first basic cms created for learnign node.js, mogoose and mongodb

# About 
<p>This is my frist more extensive app in node.js and backend app. I created this blog on my self without courses and any tutorials, only based from knowledge that I got from course about node.js on udemy. This blog has functions to handle accounts, users could add comments and gave likes.</p>
<p>Admin can create new articles, ban users and delete comments.</p>

<h2>Functions</h2>
<p>Register/Login - Handle for creating new accounts and logging into existing ones. When user are creating new account my backed checks that the email or login aren't taken. What is more when user has account, every time when he is logging backend is checking if his login is existing in data and if it is then backend checks if password is correct and the users isn't banned</p>
<p>Admin - there is one account in data (admin) which one could create articles, banning/ban users and delete comments</p>
<p>Comments - When user is logging he can add comment into each article and likes comments (yourself and other users)</p>
<p>Fractions - each user can join to any fracion(there is 4 fraction it's blue, red, green, yellow and we have got one neutral fraction any new user is there beacouse it's default fraction)</p>
<p>Users Stats/User Panel - each user has stats like number of comments, likes (this likes are likes under comments that user add under articles) and fraction to which he is attached. This everything is displayed in User Panel(there are stats of logged user) and list of users(there are all users from data and their stats)</p>

<h2>Technologies</h2>
<ul>
  <li>JavaScript</li>
  <li>Sass</li>
  <li>Node.js</li>
  <li>Express</li>
  <li>Mongoose</li>
  <li>MongoDb</li>
  <li>Pug</li>
</ul>

<p>Status of project: finished</p>

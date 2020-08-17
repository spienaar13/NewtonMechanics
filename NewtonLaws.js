'use strict';
const start = (say, sendButton) => {
   say('In this lesson, we will be going through a lot of material 📚📖. If you would like to skip some bits feel free!\u000AJust remember there might be a few quizzes 📄 and questions📋 along the way.').then(() => {
       sendButton('Which law would you like to learn about? 🙂 ?', [{title: 'Learn Vectors', payload: '{"action":"0"}'},
       {title: 'Newton\'s 1st Law', payload: '{"action":"1"}'},
       {title: 'Newton\'s 2nd Law', payload: '{"action":"2"}'},
       {title: 'Newton\'s 3rd Law', payload: '{"action":"3"}'},
       {title: 'End lesson', payload: '{"action":"4"}'}]);
   });
  
};
 
const state = (payload, say, sendButton) => {
   var payloadObj= JSON.parse(payload);
   var action = payloadObj.action;
   var quiz = payloadObj.quiz;
   var score = payloadObj.score;
   var sayArray;
  
   /* Introduction:
   Deals with the fundamental difference between scalars and vector,
   Teaches the required geometric manipulations of vectors in order to perform calculations on various bodies
   */
   if (action === '0') {
      // introduction lesson plan
       say(['To understand the way physicists 👨🏾‍🔬describe various physical phenomena, they split the types of measurements used into two different categories:', 'Scalars and Vectors']).then(() => {
           sendButton('Which do you want to learn about?',
           [{title: 'Scalars', payload: '{"action": "scalars"}'}, {title: 'Vectors', payload: '{"action" :"vectors"}'}, {title: 'Skip', payload: '{"action" : "quiz1", "quiz" : 1, "score" : 0}'}]);
       });
   }
   // Vectors vs Scalars
   if (action === 'scalars') {
       say(['A scalar is a quantity of magnitude, meaning it is a measurement that describes the amount of something.',
       'Examples of scalars: Distance (m) , Time (s, for second), Speed(m/s) and Mass (kg).',
       'The basic operations - ➕addition, ➖subtraction, ✖️multiplication, ➗division - can be directly performed on scalar’s.',
       {attachment: 'image', url: 'https://i.imgur.com/6HzIGdB.png'},
       'For example: 10 kg + 5 kg = 15kg or 60s / 4 = 15s']).then(() => {
           sendButton('What next?', [{title: 'Vectors', payload: '{"action" :"vectors"}'}, {title: 'Skip', payload: '{"action" : "quiz1", "quiz" : 1, "score" : 0}'}]);
       });
   }
   if (action === 'vectors'){
       say(['A quantity of both magnitude and direction, meaning it has to describe both how much and in what direction, something acts in. Examples of Vectors: Forces, Displacement, Velocity, and Acceleration.',
       'Basic operations can not be directly applied to vectors because they have direction.',
       {attachment: 'image', url: 'https://i.imgur.com/JuEtSKF.png'},
       'As you can see all vectors can be drawn as a line with an arrow representing the direction ↗️ and with a length that represents its magnitude/strength. ' +
       'These directions are mathematically represented by giving the angle the vector is away from the x-axis - where pointing right is 0 or 360 degrees.',
       {attachment: 'image', url: 'https://i.imgur.com/d39r8mS.png'},
       'Words can also be used to describe the direction of a vector . For example, “up” or “north” ⬆️ would imply 90 degrees and ⬅️ “left” or “west” would imply 180 degrees.']).then(() => {
           sendButton('What next?', [{title: 'Scalars', payload: '{"action" :"scalars"}'}, {title: 'Quiz', payload: '{"action" : "quiz1", "quiz" : 1, "score" : 0}'}]);
       });
   }
  
   // Quiz Number 1:
   if (action === 'quiz1') {
       var gPayload = JSON.parse(payload);
       var bPayload = JSON.parse(payload);
      
       gPayload.score = gPayload.score + 1;
       gPayload.quiz = gPayload.quiz + 1;
      
       bPayload.quiz = bPayload.quiz + 1;
      
       // Question 1 + intro:
       if (quiz == 1) {
           say(["Here is the start of your first quiz📋", "There are 4 questions, if you get 3 right, you can move on. Otherwise, you can choose to review the section."]).then(() => {
               sendButton("Q1. Which of the following are all vectors?\u000AA. Force, Velocity, Acceleration\u000AB. Speed, Distance, Weight\u000AC. Displacement, Time, Mass",
               [{title: "A. ", payload: JSON.stringify(gPayload)},
               {title: "B. ", payload: JSON.stringify(bPayload)},
               {title: "C. ", payload: JSON.stringify(bPayload)}]);
           });
       }
          
       // Question 2:
       if (quiz == 2) {
           sendButton("Q2. What is the main difference between a vector and a scalar?",                
           [{title: "A. Size", payload: JSON.stringify(bPayload)},
           {title: "B. Direction", payload: JSON.stringify(gPayload)},
           {title: "C. Spin", payload: JSON.stringify(bPayload)},
           {title: "D. All of the above", payload: JSON.stringify(bPayload)}]);
       }
          
       // Question 3:
       if (quiz == 3) {
           sendButton("Q3. What would be the difference in displacement between 40m and 20m?",
           [{title: "A. A20m", payload: JSON.stringify(bPayload)},
           {title: "B. 40m", payload: JSON.stringify(bPayload)},
           {title: "C. Not enough info", payload: JSON.stringify(gPayload)}]);
       }
          
       // Question 4:
       if (quiz == 4) {
           sendButton("Q4. Which of the following vectors are the same as 15m/s left?\u000AA. 15 m/s @ 180 degrees\u000AB. 250 km/h Left\u000AC. 15 m/s West\u000AD. All of the above",
           [{title: "A.", payload: JSON.stringify(bPayload)},
           {title: "B.", payload: JSON.stringify(bPayload)},
           {title: "C.", payload: JSON.stringify(bPayload)},
           {title: "D.", payload: JSON.stringify(gPayload)}]);
       }
          
       // SCORE AND REVIEW:
       if (quiz > 4) {
           say(["You scored " + score + " on the quiz.", "The correct answers are as follows:\u000AQ1.  A\u000AQ2. B\u000AQ3. C\u000AQ4. D"]).then(() => {
               if (score < 3) sendButton("Would you like to restart the section?", [{title: 'Restart', payload: '{"action" : "0"}'}, {title: 'Home', payload: 'restart'}]);
               else {
                   sendButton('On to Vector Calculations?', [{title: 'Yes', payload: '{"action" :"calcs"}'}, {title: 'Review?', payload: '{"action" :"0"}'}]);
               }
           });
       }
   }
  
   // Vector Calculations
   if(action === 'calcs') {
       say(['When we, as physicists, need to try and solve for the motion of some object, we need to first examine how many dimensions the object is moving in.',
       'If we are looking at a car🚗 traveling in a straight line or an apple🍏 falling from a tree, the object is only acting in one dimension. On either the x- or the y-axis.',
       {attachment : 'image', url: 'https://i.imgur.com/Q8vQHPB.png'},
       'In these examples, as long as we define a certain direction as being ‘positive’, then we should be able to perform vector calculations easily.',
       {attachment: 'image', url: 'https://i.imgur.com/oeLUieo.png'}]).then(() => {
           sendButton('What is 40m North + 50m South?', [{title: '40m East', payload: '{"action" : "calcs1.0"}'},
           {title: '0 m', payload: '{"action" : "calcs1.0"}'},
           {title: '10m South', payload: '{"action" : "calcs1.1"}'}]);
       });
   }
  
   if (action === 'calcs1.0' || action === 'calcs1.1') {
       switch (action) {
           case 'calcs1.0' : sayArray = ["Incorrect.🧐 You need to assign North to be positive, making 50m south negative: 40 - 50 = - 50m = 50m South"];
           break;
           case 'calcs1.1' : sayArray = ["Correct!😀 You could've assigned North to be positive, making 50m south negative: 40 - 50 = - 50m = 50m South"];
           break;
       }
      
       sayArray.push("However when we bring in a second dimension, our calculations become a bit more complicated; we need to start using trigonometry.📐",
           {attachment : 'image', url: "https://i.imgur.com/QaOO64X.png"},
           "In this example, it is useful to think of a vector as the hypotenuse of a triangle.",
           "You can split these vectors up into their vertical and horizontal components, perform the calculations on those components and then add them back together again.",
           "Let's look at a simple example with only one vector:\u000AYou may use calculator📚📱 with sin and cos functions",
           {attachment : 'image', url: "https://i.imgur.com/tj45TNz.png"});
      
       say(sayArray).then(() => {
           sendButton("What are the dimensions of this triangle?\u000AA. Vertical = 43.3; Horizontal = 25\u000AB. Vertical = 25; Horizontal = 43.3\u000AC. Vertical = 25; Horizontal = 25",
               [{title: "A. ", payload: '{"action" : "calcs2.1"}'},
               {title: "B. ", payload : '{"action" : "calcs2.0"}'},
               {title: "C. ", payload : '{"action" : "calcs2.0"}'}]);
       });
   }
  
   if (action === 'calcs2.0') sendButton('Your answer is incorrect.🧐 You might need to go back and review your trigonometry in order to use Newton’s Laws.', [{title: "Quit", payload: 'restart'}, {title: "Continue Anyway", payload: '{"action" : "calcs2.1"}'}]);
   if (action === 'calcs2.1') {
      sayArray = ['Awesome!☺️',
               'In this example we can multiply 50 by sin(30) to get the vertical component and to get the horizontal component, we can multiply 50 by cos(30). Just basic SohCahToa!',
               'Now take a look back at the first example. If we split the vectors into into its separate components, it would look like this: ',
               {attachment: 'image', url: 'https://i.imgur.com/xHIOTRz.png'},
               'Here we decomposed the vector into its horizontal and vertical components so that we can do the same addition/subtraction that we saw in 1-dimensional vector calculations',
               'Rember, by convention, “up” and “right” are positive, making “down” and “left” negative.'];
       say(sayArray).then(() => {
           sendButton('What is the resultant vector?\u000AA. Vertical = -2,3; Horizontal = 43.3\u000AB. Vertical =  54.3; Horizontal = 13.3\u000AC. Vertical =  2.3; Horizontal =  43.3',
           [{title: "A.", payload: '{"action" : "calcs3.0"}'},
           {title: "B.", payload: '{"action" : "calcs3.0"}'},
           {title: "C.", payload: '{"action" : "calcs3.1"}'}]);
       });
   }
  
   if (action === 'calcs3.1' || action === 'calcs3.0') {
       switch (action) {
           case 'calcs3.0' : sayArray = ["The correct answer is C", "In this example, all we need to do is apply the basic operations to the decomposed vector. " + 
           "Because up and right are positive by convention, we get the Vertical component through: 28.3 - 26.0 = 2.3 and the horizontal component through: 28.3 + 15 = 43.3."];
           break;
           case 'calcs3.1' : sayArray = ["Correct!👍"];
       }
       sayArray.push('Now the last step is to figure out the angle and the magnitude of the resultant vector from the vertical and horizontal components.',
           {attachment : 'image', url: 'https://i.imgur.com/kAozYjo.png'},
           'In this we can just use pythagoras’ theorem to find the magnitude and the inverse tan function to find the degree of the resultant vector.');
       say(sayArray).then(() => {
           sendButton('Therefore, 40 units @ 45 degrees + 30 units and 330 degrees = \u000AA. 45 units @ 15 degrees\u000AB. 43.4 units @ 3 degrees\u000AC. 40 units @ 2 degrees',
           [{title: "A. ", payload: '{"action" : "calcs4.0"}'},
           {title: "B. ", payload: '{"action" : "calcs4.1"}'},
           {title: "C. ", payload: '{"action" : "calcs4.0"}'}]);
       });
   }
 
   if (action === 'calcs4.0') {
       say(["Unfortunately your answer is incorrect.😬", "The correct answer is B. Here's how:",
           {attachment : 'image', url: 'https://i.imgur.com/zFsW9Ge.png'}]).then(() => {
               sendButton('Continue?', [{title: 'Yes', payload: '{"action" : "calcs4.1"}'}, {title: 'Restart Vectors Calculations', payload: '{"action" : "calcs"}'}]);
           });
   }
   if (action === 'calcs4.1') {
       sayArray = ['Fantastic!😎Your solution probably looks something like this: ',
       {attachment : 'image', url: 'https://i.imgur.com/zFsW9Ge.png'},
       'If you look closely, you will see that this is the same as putting the vectors tip to tail!',
       {attachment : 'image', url: 'https://i.imgur.com/pnsoeml.png'},
       'Now it’s time to try this entirely by yourself! Grab a pen and paper 📝 solve the addition of these THREE vectors:',
       {attachment : 'image', url: 'https://i.imgur.com/jvMzrzf.png'}];
       say(sayArray).then(() => {
           sendButton('The resulting vector is: \u000A*Use calculator\u000A*Round of to the 2nd unit in your calculations', [
               {title: "A. 23.4m @ 170 degrees", payload: '{"action" : "calcs5.0"}'},
               {title: "B. 10.1m left", payload: '{"action" : "calcs5.0"}'},
               {title: "C. 0.0m", payload: '{"action" : "calcs5.1"}'}]);
       });
   }
   if (action === 'calcs5.0') {
       say(['Unfortunately, you have not answered this last question correctly. This is how you would decompose the vector into its vert. and horiz. components:',
       {attachment : 'image', url: 'https://i.imgur.com/8xKVAfP.png'},
       'Vertical = 35.36 - 35.36 = 0;\u000AHorizontal = -35.36 - 18.7 + 54.06 = 0']).then(() => {
           sendButton('What next?', [{title: 'Review Vector Calculations', payload: '{"action" :"calcs"}'}, {title: 'Continue to finish', payload: '{"action" : "calcs5.1"}'}]);
       });
   }
   if (action === 'calcs5.1') {
       say(["You've finished the section! Well done!", 'You now know the difference between a vector and a scalar and how to perform calculations on each!', ' - The first step to becoming a real physicist. ;)']).then(() => {
           sendButton('Which law would you like to learn about next?', [{title: 'Newton\'s 1st Law', payload: '1'}, {title: 'Newton\'s 2nd Law', payload: '2'}, {title: 'Newton\'s 3rd Law', payload: '3'}, {title: 'End lesson', payload: '4'}]);
       });
   }
  
  
   /* First Law
   Introduces Isaac Newton
   Descriptions of Motion
   Quiz on terms
   First Law broken down
   Rest vs Constant Velocity
   Frames of Reference
   */
   // Introduce Newton
   if (action === '1') {
       say([{attachment : 'image', url: 'https://i.imgur.com/ZLct4Qy.png'}, "Greetings! I am Sir Isaac Newton (United Kingdom, 1727), one of the world’s most renowned physicists.",
           '\'Tis I whomst discovered the Three Laws of Motion: a most fundamental description of particles’ movement through space.' +
           'It can accurately describe the travel of a baseball⚾️, footbal🏈l, car🚗 etc… through the air or on ground given the sum of all forces acting on it.',
           {attachment : 'image', url: 'https://i.imgur.com/GSWnjqs.png'},
           'Before we look at my first law, we need to go through a couple of terms most commonly used by physicist to describe motion:\u000ADisplacement, Velocity, Acceleration, Forces, Friction, Mass, Weight',
           'I will be testing your knowledge of these terms in a quiz, so make sure you understand each before continuing!']).then(() => {
               sendButton('Which one do you want to learn about first?', [
                   {title: 'Displacement', payload: '{"action" : "disp"}'},
                   {title: 'Velocity', payload: '{"action" : "vel"}'},
                   {title: 'Acceleration', payload: '{"action" : "acc"}'},
                   {title: 'Force', payload: '{"action" : "forc"}'},
                   {title: 'Friction', payload: '{"action" : "fric"}'},
                   {title: 'Mass vs Weight', payload: '{"action" : "mvw"}'},
                   {title: 'Skip to Quiz', payload: '{"action" : "quiz2", "quiz" : 1, "score" : 0}'}]);
           });
   }
  
   //Descriptions of Motion
   if (action === 'disp') {
       say(['Displacement (D) is the straight line distance between two points, measured in meters (m).',
       'It is distinct from distance traveled/total path even though both are a way of keeping track of a change in position.',
       'Displacement is a vector',
       {attachment : 'image', url : 'https://i.imgur.com/y4AcJgG.png'}]).then(() => {
           sendButton('Next?', [
                   {title: 'Velocity', payload: '{"action" : "vel"}'},
                   {title: 'Acceleration', payload: '{"action" : "acc"}'},
                   {title: 'Force', payload: '{"action" : "forc"}'},
                   {title: 'Friction', payload: '{"action" : "fric"}'},
                   {title: 'Mass vs Weight', payload: '{"action" : "mvw"}'},
                   {title: 'Skip to Quiz', payload: '{"action" : "quiz2", "quiz" : 1, "score" : 0}'}]);
       });
   }
   if (action === 'vel') {
       say(['A measure of displacement (m) per unit time (= m/s). Different to ‘speed’, which measures distances traveled per unit time.',
       'If a race car travels around a NASCAR track at 100km/h💨, after exactly one lap the average speed would be 100km/h, however the average velocity will be 0.',
       'This is because velocity is a vector']).then(() => {
           sendButton('Next?', [
                   {title: 'Displacement', payload: '{"action" : "disp"}'},
                   {title: 'Acceleration', payload: '{"action" : "acc"}'},
                   {title: 'Force', payload: '{"action" : "forc"}'},
                   {title: 'Friction', payload: '{"action" : "fric"}'},
                   {title: 'Mass vs Weight', payload: '{"action" : "mvw"}'},
                   {title: 'Skip to Quiz', payload: '{"action" : "quiz2", "quiz" : 1, "score" : 0}'}]);
       });
   }
   if (action === 'acc') {
       say(['The rate of change, of the velocity on an object (m/s^2).',
       'Acceleration is experienced by humans as the thing you feel pushing you back into the seat when you hit the gas pedal.',
       'Whenever the velocity of something changes, there is either a positive or a negative acceleration in that direction',
       'The average acceleration of any object on earth is 9.81 m/s^2 towards the earth’s surface (-9.81m/s^2).',
       {attachment : 'image', url : 'https://i.imgur.com/jCtBDaD.png'}]).then(() => {
           sendButton('Next?', [
                   {title: 'Displacement', payload: '{"action" : "disp"}'},
                   {title: 'Velocity', payload: '{"action" : "vel"}'},
                   {title: 'Force', payload: '{"action" : "forc"}'},
                   {title: 'Friction', payload: '{"action" : "fric"}'},
                   {title: 'Mass vs Weight', payload: '{"action" : "mvw"}'},
                   {title: 'Skip to Quiz', payload: '{"action" : "quiz2", "quiz" : 1, "score" : 0}'}]);
       });
   }
   if (action === 'forc') {
       say(['Any interaction that, when unopposed, will change the motion of an object. A force can therefore cause an object with mass to change its velocity.' ,
       'It should therefore be clear that forces and accelerations are in some way linked (hint for future)',
       'It is represented in the same way as a vector - a line with an arrow head.',
       'The SI unit used to measure force is the Newton! (N). Yay me!😎',
       'A common way to describe something pushing/pulling on material is to say that there is a force applied to the object, or Fappl for short.',
       {attachment : 'image', url : 'https://i.imgur.com/H1W11Ti.png'}]).then(() => {
           sendButton('Next?', [
                   {title: 'Displacement', payload: '{"action" : "disp"}'},
                   {title: 'Velocity', payload: '{"action" : "vel"}'},
                   {title: 'Acceleration', payload: '{"action" : "acc"}'},
                   {title: 'Friction', payload: '{"action" : "fric"}'},
                   {title: 'Mass vs Weight', payload: '{"action" : "mvw"}'},
                   {title: 'Skip to Quiz', payload: '{"action" : "quiz2", "quiz" : 1, "score" : 0}'}]);
       });
   }
   if (action === 'fric') {
       say(['Friction is a type of force. It is exerted by a surface on an object that moves across it',
       'An object will not slide over a surface if the applied force is less than the friction force.',
       'In short, the reason why all objects don\'t just keep sliding around everywhere is because friction keeps them in place',
       'Imagine an air hockey table: This environment has nearly no surface friction',
       '"Friction" is also used to describe any force that impedes the motion of an object',
       'There are two main types of friction forces: sliding and static.']).then(() => {
           sendButton('Do you want to learn the difference between static and sliding friction?', [
               {title: "Yes - experiment 🔬📊📏", payload : '{"action" : "fric2"}'},
               {title: "No - skip", payload : '{"action" : "fric3"}'}
           ]);
       });
   }
   if (action === 'fric2' || action === 'fric3') {
       if (action === 'fric2') {
           sayArray = ['The difference in static and sliding friction is because, once an object starts to move across a surface, less force is required to continue its motion',
            'You can demonstrate this yourself:\u000ATake any object of about 1kg mass, attach an elastic or spring to it and place it on your desk\u000A' +
            'Now try and stretch the elastic/spring until the point just before it starts to slide',
            {attachment: 'image', url: 'https://i.imgur.com/LEPXxOP.jpg'},
            'Notice how this elastic/spring stretches more just before it moves than whilst sliding\n\nThis is because static friction has a larger force than sliding',
            {attachment: 'image', url: 'https://i.imgur.com/JvPXSj1.jpg'}];
       } else sayArray = ['skipping'];
       say(sayArray).then(() => {
           sendButton('Next?', [{title: 'Displacement', payload: '{"action" : "disp"}'},
           {title: 'Velocity', payload: '{"action" : "vel"}'},
           {title: 'Acceleration', payload: '{"action" : "acc"}'},
           {title: 'Force', payload: '{"action" : "forc"}'},
           {title: 'Mass', payload: '{"action" : "mass"}'},
           {title: 'Weight', payload: '{"action" : "weig"}'},
           {title: 'Skip to Quiz', payload: '{"action" : "quiz2", "quiz" : 1, "score" : 0}'}]);
       });
   }
  
   if (action === 'mvw') {
       say(['Mass is quantitative measure of an object’s ability to resist a change in its velocity I.e the physical property of inertia.🏋️',
       'SI unit most commonly used is the Kilogram (Kg).',
       'Where-as weight is the force exerted by an object as result of its mass and gravity.',
       'To get your weight, you need to multiply your mass with acceleration due to gravity. E.g: 50 Kg x 9.81 m/s^2 = 490.5 N']).then(() => {
           sendButton('Next?', [
                   {title: 'Displacement', payload: '{"action" : "disp"}'},
                   {title: 'Velocity', payload: '{"action" : "vel"}'},
                   {title: 'Acceleration', payload: '{"action" : "acc"}'},
                   {title: 'Friction', payload: '{"action" : "fric"}'},
                   {title: 'Go to Quiz', payload: '{"action" : "quiz2", "quiz" : 1, "score" : 0}'}]);
       });
   }
  
   // Quiz Number 2:
   if (action === 'quiz2') {
       var gPay = JSON.parse(payload);
       var bPay = JSON.parse(payload);
       gPay.score = gPay.score + 1;
       gPay.quiz = gPay.quiz + 1;
       bPay.quiz = bPay.quiz + 1;
      
       // Question 1
       if (quiz == 1) {
           say(["Here is the start of your second quiz!📋", "There are 4 questions, if you get 3 right, you can move on. Otherwise, you can choose to review the section."]).then(() => {
               sendButton("Q1. What units are the units used to describe Acceleration?\u000AA. Newton/meter (N/m)\u000AB. Meters/second/second (m/s^2)\u000AC. Displacement/second/second (m/s^2)\u000AD. Mass/meters/second (Kg/m.s)", [
               {title: "A.", payload: JSON.stringify(bPay)},
               {title: "B.", payload: JSON.stringify(bPay)},
               {title: "C.", payload: JSON.stringify(gPay)},
               {title: "D.", payload: JSON.stringify(bPay)}]
               );
           });
       }
      
       // Question 2
       if (quiz == 2) {
           sendButton("Q2. After exactly one lap of an athletics track, what is a possible combination of average speed and displacement?",                
           [{title: "A. 7 m/s, 400m right", payload: JSON.stringify(bPay)},
           {title: "B. 0 m/s, 0m", payload: JSON.stringify(bPay)},
           {title: "C. 0 m/s, 400m right", payload: JSON.stringify(bPay)},
           {title: "D. 7 m/s, 0m", payload: JSON.stringify(gPay)}]);
       }
      
       // Question 3
       if (quiz == 3) {
           sendButton("Q3. What’s the difference between mass and weight?\u000AA. Mass = amount of stuff, weight = amount of stuff of person.\u000AB. Mass = measure of inertia, weight = force caused by the mass of an object",                
           [{title: "A.", payload: JSON.stringify(bPay)},
           {title: "B.", payload: JSON.stringify(gPay)},
           ]);
       }
      
       // Question 4
       if (quiz == 4) {
       sendButton("Q4. A car is traveling East-wards, at 100 km/h. The driver slams on its breaks, what direction is the car’s acceleration? ",                
           [{title: "A. No acceleration", payload: JSON.stringify(bPay)},
           {title: "B. East", payload: JSON.stringify(bPay)},
           {title: "C. West", payload: JSON.stringify(gPay)}]);
       }
      
       // Review and Next
       if (quiz > 4) {
           say(["You scored " + score + " on the quiz.", "The correct answers are as follows:\u000AQ1. C\u000AQ2. D\u000AQ3. B\u000AQ4. C"]).then(() => {
               if (score < 3) sendButton("Would you like to restart the section?", [{title: 'Review terms', payload: '{"action" : "quiz2", "quiz" : "review"}'}, {title: 'Back to Home', payload: 'restart'}]);
               else {
                   sendButton('Well done!!!\u000AOn to my First Law?', [{title: 'Yes', payload: '{"action" :"firstL"}'}, {title: 'Review?', payload: '{"action" : "quiz2", "quiz" : "review"}'}]);
               }
           });
       }
       if (quiz === 'review') {
           sendButton('Which term do you want to go back over?',  [
                   {title: 'Displacement', payload: '{"action" : "disp"}'},
                   {title: 'Velocity', payload: '{"action" : "vel"}'},
                   {title: 'Acceleration', payload: '{"action" : "acce"}'},
                   {title: 'Friction', payload: '{"action" : "fric"}'},
                   {title: 'Mass vs Weight', payload: '{"action" : "mvw"}'}]);
       }
   }
  
   // First law presented and Explained
   if (action === "firstL") {
       say(['Now that you are armed with the language of physicists, we can look at my first law!',
       '_Every object persists in its state of rest or uniform motion in a straight line, unless it is made to change that state by an acting force._',
       'An example of uniform motion is traveling at constant velocity',
       'This essentially says two things:\u000A\u000A1) An object\'s state remains the same when there is no net force\u000A 2) An object moving in a straight line will not turn without a net force']).then(() => {
           sendButton('But what is Constant Velocity more specifically?', [{title: 'Continue', payload: '{"action" : "constV"}'}]);
       });
   }
  
  
   // Constant Velocity vs Rest Explanantion
   if (action === 'constV') {
       say(["In the first law, we saw the terms *Rest* and *Uniform Motion/Constant Velocity*, but what do these terms mean really?",
           'Though these two terms seem very different (ones moving, ones not) in physics they are practically the same thing!',
           'Both of these require the sum of all forces acting on a body to be balanced. ' +
           'This is because any force that acts on a body causes it to accelerate in the direction of that force (my second law).',
           'Let\'s look at me falling from a plane as an example: ',
           {attachment: 'image', url: 'https://i.imgur.com/KVAcHHb.png'},
           'Here you can see there is an unbalanced force acting on me (gravity), so my velocity is changing (I\'m accelerating downwards)',
           {attachment: 'image', url: 'https://i.imgur.com/1gSoVsl.png'},
           'Here, I\'ve fallen for long enough to reach terminal velocity (where the force from wind resistance is equal to the force of gravity). ' +
           'I am now travelling at a *constant velocity*. There is no net acceleration. Which would look the same as this:',
           {attachment: 'image', url: 'https://i.imgur.com/eejKnvJ.png'},
           'Here, the force pushing up from the chair against my weight is the balancing force. So in both these cases I am in the same "state of motion" because the forces acting on me are balanced.'
           ]).then(() => {
               sendButton('I think I get it now', [
                   {title: "Move onto Quiz", payload: '{"action" : "quiz3", "quiz" : 1, "score" : 0}'},
                   {title: "Frames of Reference", payload: '{"action" : "FoR"}'}
               ]);
           });
   }
 
   // Frames of Reference
   if (action === 'FoR') {
       say(['Lastly, let us lastly look at some other aspect of physics that will become more important in later calculations: Frames of reference.',
           'A Frame of Reference is an abstract coordinate system that gives a physical reference point. Essentially, it allows the physicist to specify the direction’s being used in their calculations.',
           'It will indicate which way is up/down, left/right and can even be used to represent a 3-D space. ',
           'The y-axis is usually used to represent up height and the x-axis for width.',
           {attachment: 'image', url: 'https://i.imgur.com/xdKIbN9.png'}]).then(() => {
           sendButton('Continue to quiz', [
               {title: 'Yes', payload: '{"action" : "quiz3", "quiz" : 1, "score" : 0}'},
               {title: 'No - restart section', payload: '{"action" : "1"}'}
           ]);
       });
   }
 
   // Quiz Number Three
   if (action === 'quiz3') {
       var gPay3 = JSON.parse(payload);
       var bPay3 = JSON.parse(payload);
      
       gPay3.score = gPay3.score + 1;
       gPay3.quiz = gPay3.quiz + 1;
      
       bPay3.quiz = bPay3.quiz + 1;
      
       // Question 1 + intro:
       if (quiz == 1) {
           say(["Here is the start of your third quiz", "There are 7 questions, if you get 5 right, you can move on. Otherwise, you can choose to review the section."]).then(() => {
               sendButton('Q1. Objects in orbit around the Earth (like a satellite) must have a net force acting on them. ?',
               [{title: "A. True", payload: JSON.stringify(gPay3)},
               {title: "B. False", payload: JSON.stringify(bPay3)}]);
           });
       }
 
       // Question 2-7:
       if (quiz == 2) {
           sendButton('When no net force is acting on a moving object, it still comes to rest because of its interia', [
               {title: "A. True", payload: JSON.stringify(bPay3)},
               {title: "B. False", payload: JSON.stringify(gPay3)}
           ]);
       }
       if (quiz == 3) {
           sendButton('A stationary object must have no forces acting on it.', [
               {title: "A. True", payload: JSON.stringify(bPay3)},
               {title: "B. False", payload: JSON.stringify(gPay3)}
           ]);
       }
       if (quiz == 4) {
           sendButton('When an object is moving at constant velocity, any forces acting on it must be balanced',[
               {title: "A. True", payload: JSON.stringify(gPay3)},
               {title: "B. False", payload: JSON.stringify(bPay3)}
           ]);
       }
       if (quiz == 5) {
           sendButton('An object that is not accelerating or decelerating, must have *no forces* acting on it', [
               {title: "A. True", payload: JSON.stringify(bPay3)},
               {title: "B. False", payload: JSON.stringify(gPay3)}
           ]);
       }
       if (quiz == 6) {
           sendButton('One can change the direction of an objet\'s motion without apply a net force', [
               {title: "A. True", payload: JSON.stringify(bPay3)},
               {title: "B. False", payload: JSON.stringify(gPay3)}
           ]);
       }
       if (quiz == 7) {
           sendButton('We have chosen a car moving at 100km/h right as our frame of reference. If a foam ball is dropped out the window, what velocity does it have?', [
               {title: "A. 0 km/h", payload: JSON.stringify(bPay3)},
               {title: "B. ~ 100 km/h left", payload: JSON.stringify(gPay3)},
           ]);
       }
 
       if (quiz > 7) {
           say(["You scored " + score + " on the quiz.", "The correct answers are as follows:\u000AQ1.  A. True\u000AQ2. B. False\u000AQ3. B. False\u000AQ4. A. True\u000AQ5. B. False\u000AQ6. B. False\u000AQ7. B."]).then(() => {
               if (score < 5) sendButton("Your score wasn't high enough to pass. Would you like to restart the section?", [{title: 'Restart', payload: '{"action" : "1"}'}, {title: 'Home', payload: 'restart'}]);
               else {
                   sendButton('Congratulations! What law do you want to learn about next?', [
                       {title: 'Learn Vectors', payload: '{"action" : "0"}'},
                       {title: 'Newton\'s 1st Law', payload: '{"action" : "1"}'},
                       {title: 'Newton\'s 2nd Law', payload: '{"action" : "2"}'},
                       {title: 'Newton\'s 3rd Law', payload: '{"action" : "3"}'},
                       {title: 'End lesson', payload: '{"action" : "4"}'}]);

               }
           });
       }
   }

    
    // Second Law
    if (action === '2') {
        // lesson plan for Newton's Second Law
        say(['Ok let\’s begin!', {attachment: 'image', url: 'https://i.imgur.com/J8Td9NP.png'},'Hi! My name is Mary Jackson, a former senior engineer at NASA who helped the USA win the space race to the moon!','Today, I’m going to be using some of the things I learned from working with rockets to teach you about Newton’s Second Law!']).then(() => {sendButton('Continue?', [{title: 'Yes', payload: '{"action" : "1c1"}'}])});
    }
    if (action === '1c1') {
        say(['In Newton’s First Law, we learned that objects in motion stay in motion when acted upon by balanced forces.','However, Newton’s Second Law tells us what happens to an object when it is acted upon by unbalanced forces.']).then(() => {sendButton('Continue?', [{title: 'Yes', payload : '{"action" : "1c2"}'}])});
    }
    if (action === '1c2') {
        say(['Take this rocket for example, floating through the frictionless vacuum of space.', {attachment: 'image', url: 'https://i.imgur.com/JyCHY4q.png'},'Since this rocket is floating through empty space, where there is no friction, no gravitational force, and no other internal or external forces, the rocket abides by Newton’s First Law: drifting through space at a constant velocity']).then(()=> {sendButton('Continue?', [{title: 'Yes', payload : '{"action" : "1c3"}'}])});
    }
    if (action === '1c3') {
        say('However, imagine the rocket hurtling towards the sun, putting its passengers in danger!',{attachment: 'image', url: 'https://i.imgur.com/OjGoYfT.png'}).then(()=> {sendButton('What could the rocket do to change its speed and direction to avoid flying straight into the molten hot lava on the sun’s surface?', [{title: 'Everyone jump ship', payload : '1c4'},{title: 'Pour water on the sun', payload : '1c4'},{title: 'Change rocket direction', payload : '{"action" : "1c5"}'}])});
    }
    if (action === '1c4') {
        sendButton('Incorrect. Try the question again!', [{title: 'Try again', payload : '1c3'}, {title: 'Continue', payload : '1c5'}]);
    }
    if (action === '1c5') {
        say(['Great!','The only way the rocket can avoid the sun is to change directions, which can only be accomplished by acting on the rocket with unbalanced forces to override Newton’s First Law.','The rocket does this by producing a propulsion force, which we can visualize in a free body diagram like this.', {attachment: 'image', url: 'https://i.imgur.com/g49QRKP.png'}]).then(()=> {sendButton('Continue?', [{title: 'Yes', payload : '{"action" : "1c6"}'}])});
    }
    if (action === '1c6') {
        say(['Since the rocket is now being acted upon by an unbalanced force, the rocket begins to accelerate in the direction of the net force.','In this case, we can see that the rocket will now accelerate in the direction of the propulsion force, avoiding the sun and saving the lives of its passengers. This is easy to visualize because there is only one force acting on the rocket.']).then(()=> {sendButton('Continue?', [{title: 'Yes', payload : '{"action" : "1c7"}'}])});
    }
    if (action === '1c7') {
        say(['However, what if there is MORE than one force acting on the rocket? How can we calculate the direction and magnitude of the rocket’s acceleration?','For this, we need to learn how to calculate the net force (or Fnet) acting on the rocket','Net force is the sum of all the forces acting on an object in every direction.','We can represent this in an equation as Fnet = F1 + F2 + …, or Fnet = ΣForces.']).then(()=> {sendButton('Continue?', [{title: 'Yes', payload : '{"action" : "1c8"}'}])});
    }
    if (action === '1c8') {
        say(['Now, let’s move on to a different example. Let’s imagine the rocket sitting on Earth preparing for takeoff.', {attachment: 'image', url: 'https://i.imgur.com/wywpia9.png'},'If we draw a free body diagram on this rocket, we see that the rocket has two forces acting on it, the force of gravity downwards and the normal force upwards.',{attachment: 'image', url: 'https://i.imgur.com/ZQEswdR.png'}]).then(()=> {sendButton('Continue?', [{title: 'Yes', payload : '{"action" : "1c9"}'}])});
    }
    if (action === '1c9') {
        say(['Now, to calculate the net force, we are going to split up the forces into their respective x-components and y-components.','In the x direction (horizontal direction), we can see that there are no forces and thus a net force of 0.','In the y direction, however, we see that there are two forces, the force of gravity acting downwards with a force of -1000N and the normal force acting upwards with a force of 1000N.']).then(()=> {sendButton('Now, using the net force equation, calculate the net force acting on the rocket:', [{title: '2000N', payload : '{"action" : "1c10"}'},{title: '-2000N', payload : '{"action" : "1c10"}'},{title: '0N', payload : '{"action" : "1c11"}'},{title: '1000N', payload : '{"action" : "1c10"}'}])});
    }
    if (action === '1c10') {
        sendButton('Incorrect. Try the question again!', [{title: 'Try again', payload : '1c9'}, {title: 'Continue', payload : '{"action" : "1c11"}'}]);
    }
    if (action === '1c11') {
        say(['Great! Now let’s try a more complicated example.','Imagine the rocket flying through space away from planet Earth as depicted in the image below.',{attachment: 'image', url: 'https://i.imgur.com/3mlQwQZ.png'}]).then(()=> {sendButton('Continue?', [{title: 'Yes', payload : '{"action" : "1c12"}'}])});
    }
    if (action === '1c12') {
        say(['Now, let’s draw a free body diagram on this rocket, taking into account the propulsion force of the rocket (1500N northeast) as well as the force of gravity the planet is enacting on the rocket (1000N south).',{attachment: 'image', url: 'https://i.imgur.com/I2K3U6D.png'}]).then(()=> {sendButton('Continue?', [{title: 'Yes', payload : '{"action" : "1c13"}'}])});
    }
    if (action === '1c13') {
        say(['Once again, to calculate the net force, we are going to split up the forces into their respective x-components and y-components.','This one is more difficult because the forces aren’t only acting in the x and y directions. For example, the propulsion force the rocket is generating is acting in a diagonal direction, which affects both the x and y directions.','To deal with this, we have to split up the propulsion force into its own x and y components, as seen in the image below.', {attachment: 'image', url: 'https://i.imgur.com/I2K3U6D.png'}]).then(()=> {sendButton('Continue?', [{title: 'Yes', payload : '{"action" : "1c14"}'}])});
    }
    if (action === '1c14') {
        say(['Now, how do we calculate the x and y components of the propulsion force? We do this using angles and trigonometry.','From the information provided before, we know the rocket is being propelled in a northeast direction, which is equivalent to a 45º angle from the x axis, like so:',{attachment: 'image', url: 'https://i.imgur.com/uxYeO4z.png'},'Therefore, using trigonometry, we can calculate the x component of the propulsion force using cos(45º) = Fpropulsion,x / 1500N.','Fpropulsion thus equals 1060.66N.']).then(()=> {sendButton('Continue?', [{title: 'Yes', payload : '{"action" : "1c15"}'}])});
    }
    if (action === '1c15') {
        say(['Similarly, we can find Fpropulsion,y using trigonometry and the equation sin(45º) = Fpropulsion,y / 1500N.','Fpropulsion,y thus equals 1060.66N.',{attachment: 'image', url: 'https://i.imgur.com/fRXghsU.png'}]).then(()=> {sendButton('Continue?', [{title: 'Yes', payload : '{"action" : "1c16"}'}])});
    }
    if (action === '1c16') {
        say(['Now, using the information we have, calculate the net force in each direction for the rocket.']).then(()=> {sendButton('What is the net force in the x direction?”', [{title: '2060.66N', payload : '{"action" : "1c17"}'},{title: '1060.66N', payload : '{"action" : "1c18"}'},{title: '500N', payload : '{"action" : "1c17"}'},{title: '60.66N', payload : '{"action" : "1c17"}'}])});
    }
    if (action === '1c17') {
        sendButton('Incorrect. Try the question again!', [{title: 'Try again', payload : '{"action" : "1c16"}'}, {title: 'Continue', payload : '{"action" : "1c18"}'}]);
    }
    if (action === '1c18') {
        say(['Great!']).then(()=> {sendButton('Now, what is the net force in the y direction?', [{title: '2060.66N', payload : '{"action" : "1c19"}'},{title: '1060.66N', payload : '{"action" : "1c19"}'},{title: '500N', payload : '{"action" : "1c19"}'},{title: '60.66N', payload : '{"action" : "1c20"}'}])});
    }
    if (action === '1c19') {
        sendButton('Incorrect. Try the question again!', [{title: 'Try again', payload : '{"action" : "1c18"}'}, {title: 'Continue', payload : '{"action" : "1c20"}'}]);
    }
    if (action === '1c20') {
        say(['Now, we are going to combine the x and y net forces to get an overall net force’s direction and magnitude.','We can calculate the magnitude of the net force using some more trigonometry, specifically a^2+b^2 = c^2 (with a = net force in the x direction, b = net force in the y direction, and c = overall net force).']).then(()=> {sendButton('Using this information, what is the magnitude of the overall net force?', [{title: '0N', payload : '{"action" : "1c21"}'},{title: '1060.66N', payload : '{"action" : "1c21"}'},{title: '1062.39N', payload : '{"action" : "1c22"}'},{title: '2062.39N', payload : '{"action" : "1c21"}'}])});
    }
    if (action === '1c21') {
        sendButton('Incorrect. Try the question again!',[{title: 'Try again', payload : '{"action" : "1c21"}'}, {title: 'Continue', payload : '{"action" : "1c22"}'}]);
    }
    if (action === '1c22') {
        say(['Next, we can use the x and y components to calculate the direction of the net force.','Using the trigonometric property of θ = tan-1(y/x), we can use y = net force in the y direction and x = net force in the x direction to calculate the direction of the net force (θ).']).then(()=> {sendButton('Using the information given, what is the direction of the overall net force?', [{title: '0º', payload : '{"action" : "1c23"}'},{title: '3.27º', payload : '{"action" : "1c24"}'},{title: '6.54º', payload : '{"action" : "1c23"}'},{title: '45º', payload : '{"action" : "1c23"}'}])});
    }
    if (action === '1c23') {
        sendButton('Incorrect. Try the question again!',[{title: 'Try again', payload : '{"action" : "1c22"}'}, {title: 'Continue', payload : '{"action" : "1c24"}'}]);
    }
    if (action === '1c24') {
        say(['Now that we know the direction and magnitude of the net force, we can move on to calculate the direction and magnitude of the acceleration using Newton’s Second Law.','The direction of acceleration is actually the same as the direction of the net force.']).then(()=> {sendButton('Continue?', [{title: 'Yes', payload : '{"action" : "1c25"}'}])});
    }
    if (action === '1c25') {
        say(['Now, we will learn how to calculate the magnitude of acceleration of an object.','We will achieve this by thinking about what kinds of factors affect the acceleration of an object.','The first factor that affects acceleration is force.','As we saw in the free body diagrams earlier, the stronger the force in one direction, the larger the acceleration in that direction.','This is known as a direct relationship because as force on an object increases, acceleration increases as well.','Therefore, our first factor in determining acceleration is force (which we will represent by F).']).then(()=> {sendButton('Continue?', [{title: 'Yes', payload : '{"action" : "1c26"}'}])});
    }
    if (action === '1c26') {
        say(['The second factor that affects acceleration is mass.']).then(()=> {sendButton('Think about it like this: let’s say we have two objects, one light object and one very heavy object. If we apply the same force to both objects, which one will move faster (have a larger acceleration)?', [{title: 'The lighter object', payload : '{"action" : "1c28"}'},{title: 'The heavier object', payload : '{"action" : "1c27"}'}])});
    }
    if (action === '1c27') {
        sendButton('Incorrect. Try the question again!',[{title: 'Try again', payload : '{"action" : "1c26"}'}, {title: 'Continue', payload : '{"action" : "1c28"}'}]);
    }
    if (action === '1c28') {
        say(['Great!','The smaller the mass of an object, the greater the acceleration of the object assuming a force is being acted upon it.','This is known as an inverse relationship between acceleration and mass because as the mass of the object increases, the acceleration of the object decreases.']).then(()=> {sendButton('Now, using the direct relationship between acceleration and force, and the inverse relationship between acceleration and mass, which of the following equations would best represent these relationships?', [{title: 'Acceleration=Force/Mass', payload : '{"action" : "1c30"}'},{title: 'Acceleration=Mass/Force', payload : '{"action" : "1c29"}'},{title: 'Acceleration=Mass*Force', payload : '{"action" : "1c29"}'},{title: 'Acceleration=Force^Mass', payload : '{"action" : "1c29"}'}])});
    }
    if (action === '1c29') {
        sendButton('Incorrect. Try the question again!',[{title: 'Try again', payload : '{"action" : "1c28"}'}, {title: 'Continue', payload : '{"action" : "1c30"}'}]);
    }
    if (action === '1c30') {
        say(['Great job!','This equation, *Acceleration = Force / Mass*, is what we call Newton’s Second Law. This is the equation we use to calculate the magnitude of acceleration for an object acted upon by an unbalanced force.','This equation can be rearranged into Force = Mass * Acceleration, which is the more common representation of Newton’s Second Law.']).then(()=> {sendButton('Now for a little quiz! To pass this quiz, you will need to answer 4 out of 4 questions correct.', [{title: 'Start quiz', payload : '{"action" : "CharlesQuiz", "quiz" : 1, "score" : 0}'}])});
    }
    //quiz
    if (action === "CharlesQuiz") {
        var gPa = JSON.parse(payload);
        var bPa = JSON.parse(payload);
        gPa.score = gPa.score + 1;
        gPa.quiz = gPa.quiz + 1;
        bPa.quiz = bPa.quiz + 1;
        
        //question 1
        if (quiz == 1) {
            say("Now you are going to be quized on all the material covered in this law!", 'If you score less than 3 out of 4, then you will not be allowed to progress').then(() => {
                sendButton('Question 1: Let\'s say there is a rocket flying through space with a net force of 100,000N and a mass of 9500kg. Using Newton\'s Second Law, what is the magnitude of acceleration of the rocket?', [{title: '9.5e8 m/s^2', payload: bPa}, {title: '10.53 m/s^2', payload: gPa}, {title: '0.095 m/s^2', payload: bPa}]);
            });
        }
        //question 2
        if (quiz == 2) {
            sendButton('Question 2: Let\'s say there is a 300kg rocket flying through space with a propulsion force of 1000N in the north direction and a friction force of 300N in the south direction. What is the direction of the net force of the rocket?', [{title: 'North', payload : gPa}, {title: 'South', payload : bPa}, {title: 'No acceleration', payload : bPa} ]);
        
        }
        //question 3
        if (quiz == 3) {
            sendButton('Question 3: Using the same rocket from the last question, what is the magnitude of acceleration of the rocket?', [{title: '210,000 m/s^2', payload : bPa}, {title: '0.43 m/s^2', payload : bPa}, {title: '2.33 m/s^2', payload : gPa} ]);
        }
        //question 4
        if (quiz == 4) {
            sendButton('Question 4: What did Mary Jackson do?', [{title: 'Senior engineer at NASA', payload : bPa}, {title: 'Helped win space race', payload : bPa}, {title : 'Incredible mathematician', payload : bPa}, {title: 'All of the above', payload : gPa}]);
        }
        //results
        if (quiz > 4) {
            say(["You scored " + score + " on the quiz.", "The correct answers are as follows:\u000AQ1.  10.53 m/s^2\u000AQ2. North\u000AQ3. 2.33 m/s^2\u000AQ4. All of the above"]).then(() => {
                if (score < 4) {
                    sendButton('You need 4/4 to pass, so now you need to start over!', [{title : 'Try again', payload : '{"action" : "CharlesQuiz", "quiz" : 1, "score" : 0}' }]);
                } else sendButton('Well done! You passed! Now you\'re ready for Newton\'s Third Law', [{title : 'Back to menu', payload : '{"action" : "1c40"}'}]);
                
            });
        }
    }
    if (action === '1c40') {
        sendButton('Which law would you like to learn about next?', [{title: 'Introduction', payload: '{"action" : "0"}'}, {title: 'Newton\'s 1st Law', payload: '{"action" : "1"}'}, {title: 'Newton\'s 2nd Law', payload: '{"action" : "2"}'}, {title: 'Newton\'s 3rd Law', payload: '{"action" : "3"}'}, {title: 'End lesson', payload: '{"action" : "4"}'}]);
    }
    
// third Law intro
    if (action === '3') {
    // lesson plan for Newton's Third Law
        say(['Newton\'s Third Law: _For every action, there is an equal and opposite reaction._', 
            'Hello!😀 Welcome to your lesson on Newton’s third law. My name is Chien-Shiung Wu.', 
            {attachment : 'image', url: 'https://i.imgur.com/y3LApSW.png'},
            'I am a Chinese-American physicist in the field of nuclear physics. I was the only Chinese woman to work on the Manhattan Project for the Atomic Bomb during World War 2.💥']).then(()=> {
                sendButton('Ready to begin learning the Third Law of Motion?🤩', [{title: 'Yes!🥳', payload: '{"action":"begin"}'}]);
            });
    }
                    
                    
    // lesson starts                
    if (action === 'begin' || action === 'nfreview') {
        say(['Imagine that I place my project book on a table.📕 Why doesn’t the book go through the table?',
            {attachment : 'image', url: 'https://i.imgur.com/zRKm2Dp.png'},
            'This is because of a concept called ‘Normal Force’. Let’s explore the normal force more.',
            'In this example, the book is applying a force onto the table because of the force of gravity.🌎 The reason that the book doesn’t fall straight through the table from the attraction of gravity is because the table is applying a force right back on to the book. This is the normal force.',
            {attachment : 'image', url: 'https://i.imgur.com/B657Mbm.jpg'}]).then(() => {
                sendButton('Based on the image above, we can deduce that the normal force is _____ to the table.', [
                    {title: 'parallel', payload: '{"action":"question1.0"}'},
                    {title: 'perpendicular', payload: '{"action":"question1.1"}'}]);
            });
    }
        
    // first question response array    
    if (action == "question1.0" || action == "question1.1") {
        switch (action) {
            case 'question1.0' : sayArray = ['Incorrect.❌ The correct answer is PERPENDICULAR because the force is at a 90 degree angle to the surface of the table, pushing upwards on the book.📕'];
            break;                
            case 'question1.1' : sayArray = ['Congratulations,🥳 PERPENDICULAR is the correct answer!'];
            break;
        }
        sayArray.push('The Normal Force will always be perpendicular to the contact surface that is acting on the object.👍 This means that it is at a right angle, or at a 90° angle, from the table.');
        say(sayArray).then(()=> {
            sendButton('When I walk away from the table,️ what is applying a normal force on me?', [
                {title: 'gravity', payload: '{"action":"question2.0"}'},
                {title: 'the table', payload: '{"action":"question2.0"}'},
                {title: 'the ground', payload: '{"action":"question2.1"}'}]);
            });
        
    }
        
    // second question response array
    if (action === 'question2.0' || action === 'question2.1') {
        switch (action) {
            case 'question2.0' : sayArray = ['Incorrect.❌ The correct response was THE GROUND. This is because the ground is the surface that pushed upwards on my feet to counteract the gravitational force 🌎 that is pushing me downwards.'];
            break;
            case 'question2.1' : sayArray = ['Congratulations!🥳 THE GROUND is the correct answer.'];
            break;
        }
        sayArray.push('The ground is applying a normal force on my feet as I walk. The force is perpendicular to the ground and is equal and in the opposite direction as the force of gravity 🌍 exerted on me.',
            'Now let us say I start jumping up and down️.',
            {attachment : 'image', url: 'https://i.imgur.com/nV6bZno.jpg'});
        say(sayArray).then(()=> {
            sendButton('If I start jumping up and down, as in the image above, the normal force will be ______ ____ the normal force when I was just walking.', [
                {title: 'greater than👆', payload: '{"action":"question3.1"}'},
                {title: 'less than👇', payload: '{"action":"question3.0"}'},
                {title: 'equal to👉', payload: '{"action":"question3.0"}'}]);
            });
    }
        
    // third question response array
    if (action === 'question3.0' || action === 'question3.1') {
        switch (action) {
            case 'question3.0' : sayArray = ['Incorrect.❌ The correct response was GREATER THAN.'];
            break;          
            case 'question3.1' : sayArray = ['Congratulations!🥳 GREATER THAN is the correct answer!'];
            break;
        }
        sayArray.push('The normal force will be GREATER 👆 when I am jumping because I am exerting MORE force on the ground. This means that the normal force is equal and in the opposite direction to the force applied on the surface.',
            'So this begs the question: if everything creates an equal and opposite force when a force is applied to it, how do things move?🤷️',
            'In our examples we used large and robust objects, like a table and the earth🌏, that will not move under the force of a book📕 or a person️.',
            'If I picked up my book, 📕 the book is still exerting a force on my hand because of its gravitational force. However, the book and hand are not in equilibrium because the upwards force that I exert on the book overpowers the normal force that the book is pushing back.',
            'If I tried to pick up a really heavy box📦, I would have a lot of trouble. This is because the gravitational force of the box is much greater than that of the book. This goes back to the second law of Newton’s that we learned');
        say(sayArray).then(()=> {
            sendButton('The force of gravity of an object is equal to: \n A. Its mass multiplied by the downwards acceleration of gravity (9.81 m/s^2). \n B. Its mass multiplied by its velocity. \n C. Its weight multiplied by its position in space.', [
                {title: 'A.', payload: '{"action":"question4.1"}'},
                {title: 'B.', payload: '{"action":"question4.0"}'},
                {title: 'C.', payload: '{"action":"question4.0"}'}]);
        });
    }
        
        // fourth question response array
        if (action === 'question4.0' || action === 'question4.1') {
            switch (action) {
                case 'question4.0' : sayArray = ['Incorrect.❌ The correct answer was the force of gravity of an object is equal to its mass multiplied by the downwards acceleration of gravity (9.81 m/s^2).'];
                break;
                case 'question4.1' : sayArray = ['Congratulations!🥳 This is the correct answer.'];
                break;
            }
            sayArray.push('Because the acceleration of gravity 🌎 is constant, the mass of the object is the only variable that will affect the force of gravity on an object.',
            'Thus, I will have to overpower a much greater gravitational force in order to pick up the heavy box 📦 compared to the book 📕 because the box has a greater mass than the book.',
            'Let’s take a look back at the first Law of Motion that we learned.');
            say(sayArray).then(()=> {
                sendButton('Which of the following is the first law of motion that we learned earlier? \n A. Objects move and stop on their own without an outside force. \n B. Every object persists in its state of rest or uniform motion in a straight line unless it is compelled to change that state by forces impressed on it.', [
                    {title: 'A.', payload: '{"action":"question5.0"}'},
                    {title: 'B.', payload: '{"action":"question5.1"}'}
                    ]);
            });
        }
        
    // fifth question response array
    if (action === 'question5.0' || action === 'question5.1' || action === 'pairsreview') {
        switch (action) {
            case 'question5.0' : sayArray = ['Incorrect.❌ The correct answer is B, which is the first law of motion we learned in the earlier section of this game.'];
            break;
            case 'question5.1' : sayArray = ['Congratulations!🥳 This is the correct answer!'];
            break;
            case 'pairsreview' : sayArray = ['Welcome back to reviewing action and reaction pairs!'];
            break;
        }
        sayArray.push('To reiterate, the first law of motion is -Every object persists in its state of rest or uniform motion in a straight line unless it is compelled to change that state by forces impressed on it-.🙂',
            'With this in mind, it is clear that no force acts in complete isolation.', 
            'Let’s say Isaac Newton and I are pushing a box. 📦 The box experiences no friction against the floor. Isaac is pushing the box north, and I am pushing the box south.',
            {attachment : 'image', url: 'https://i.imgur.com/B5IuztK.jpg'});
        say(sayArray).then(()=> {
                sendButton('If Isaac and I are pushing with the same magnitude, the box will be unmoving. This means that there are two ___________forces on the box. \n A. EQUAL and IN THE SAME DIRECTION. \n B. UNEQUAL and IN THE SAME DIRECTION. \n C. EQUAL and IN THE OPPOSITE DIRECTION. \n D. UNEQUAL and IN THE OPPOSITE DIRECTION.', [
                    {title: 'A.', payload: '{"action":"question6.0"}'},
                    {title: 'B.', payload: '{"action":"question6.0"}'},
                    {title: 'C.', payload: '{"action":"question6.1"}'},
                    {title: 'D.', payload: '{"action":"question6.0"}'}]);
            });
            
        }
        
    // sixth question response array
    if (action === 'question6.0' || action === 'question6.1') {            
        switch (action) {
            case 'question6.0' : sayArray= ['Incorrect.❌ The correct answer is EQUAL and IN THE OPPOSITE DIRECTION because the box is unmoving.'];
            break;
            case 'question6.1' : sayArray = ['Congratulations!🥳 This is the correct answer.'];
            break;
        }
        sayArray.push('The correct answer is that the two forces are equal and in opposite directions on the box. 📦 This results in the box being unmoving because the forces cancel each other out.');
            say(sayArray).then(()=> {
                sendButton('If Isaac, pushing south, is pushing with more force than me, pushing north, which way will the box slide?', [
                    {title: 'North', payload: '{"action":"question7.0"}'},
                    {title: 'South', payload: '{"action":"question7.1"}'},
                    {title: 'The box will be unmoving', payload: '{"action":"question7.0"}'}]);
            })}
        
    // seventh question response array    
    if (action === 'question7.0' || action === 'question7.1') {
        switch (action) {
            case 'question7.0' : sayArray = ['Incorrect.❌ The correct answer is SOUTH because Isaac is pushing harder south than I am pushing north. The net force is moving south.'];
            break;
            case 'question7.1' : sayArray = ['Congratulations!🥳 SOUTH is the correct answer.'];
            break;
        }
        sayArray.push('The correct answer was that the box will slide south and here’s why:', 
                {attachment: 'image', url: 'https://i.imgur.com/bggjLko.jpg'},
                'If you add the forces imposed on the box with example numbers here is what you will get:',
                'Let us assume north is the +y direction.', 
                'Let us say Isaac is pushing south with a force of 4 Newtons. This will be -4 Newtons because the force is south, in the -y direction.',
                'I am pushing with less force in the north direction, 3 Newtons. This will be +3 Newtons because the force is north, in the +y direction.');
        say(sayArray).then(() => {
                sendButton('What is the resultant force, from adding the 3 Newton force in the north direction (+3 Newtons) and adding the 4 Newton force in the south direction (-4 Newtons)? \n A. 1 Newton in the south direction, -1 N. \n B. 7 Newtons in the south direction, -7 N. \n C. 1 Newton in the north direction, +1 N. \n D. 7 Newtons in the north direction, +7 N.', [
                    {title: 'A.', payload: '{"action":"question8.0"}'},
                    {title: 'B.', payload: '{"action":"question8.1"}'},
                    {title: 'C.', payload: '{"action":"question8.2"}'},
                    {title: 'D.', payload: '{"action":"question8.3"}'}]);
            });
        }
        
    // eighth question response
    if (action === 'question8.0' || action === 'question8.1' || action === 'question8.2' || action === 'question8.3') {
        switch (action) {
            case 'question8.0' : sayArray = ['Congratulations!🥳 This is the correct answer.'];
            break;
            case 'question 8.1' : sayArray = ['Incorrect.❌ The correct answer is 1 Newton in the south direction, -1 N. The vector in the north direction must be treated as +3 N while the vector in the south direction must be treated as -4 N.'];
            break;
            case 'question8.2' : sayArray = ['Incorrect.❌ The correct answer is 1 Newton in the south direction, -1 N. Your addition is correct, but direction is incorrect. We established before that the box would move in the south direction.'];
            break;
            case 'question8.3' : sayArray = ['Incorrect.❌ The correct answer is 1 Newton in the south direction, -1 N. The vector in the north direction must be treated as +3 N while the vector in the south direction must be treated as -4 N. We also established before that the box would move in the south direction.'];
            break;
        }
        sayArray.push('By adding these to force vectors together, the resultant force is -1 Newton. So, the net force is 1 Newton in the south direction. Thus, the answer is the box moves in the south direction.',
        'Alright, let us move on!',
        'Now, I  am in a bumper car. 🚗 I drive the car straight into the wall. If I drives with force F into the wall, I am applying that force to the wall.',
        {attachment: 'image', url: 'https://i.imgur.com/0FXnhVP.png'},
        'Once I hit the wall, I bounce backwards. Why does this happen? Let’s explore.',
        'At the instant when the bumper car hits the wall, 🚗 the car is imposing a force F on the wall.');
        say(sayArray).then(() => {
            sendButton('The movement of the bumper car does not stop on its own. How does the car stop and change direction after hitting the wall?', [
                {title: 'The car stops itself', payload: '{"action":"question9.0"}'},
                {title: 'The wall stops the car', payload: '{"action":"question9.1"}'},
                {title: 'I am not sure', payload: '{"action":"question9.0"}'}]);
            });
    }  
    
    // ninth question response (incorrect version, moves on to correct version later)
    if (action === 'question9.0') {
        say(['Incorrect.❌ The correct answer is that the wall stops the car, and here’s why.', 
            'Similar to when the box was not moving on the ice, Isaac was pushing with a force of magnitude F in the opposite direction as me, who was also pushing with a force F.',
            'In order for the car to be stopped and change directions as it does when it hits the wall, a force has to push it to stop it and move it backwards. What must apply this force so that the car moves backwards?']).then(() => {
            sendButton('Where does this force come from?', [
                {title: 'The bumper car', payload: '{"action":"question10"}'},
                {title: 'The floor', payload: '{"action":"question10"}'},
                {title: 'The wall', payload: '{"action":"question9.1"}'}]);
        });
    }
        
    //ninth and tenth question (correct ninth or incorrect tenth)
    if (action === 'question9.1' || action === 'question10') {
        switch (action) {
            case 'question10' : sayArray = ['Incorrect.❌ The correct answer is that the force that stops the car comes from the wall.'];
            break;
            case 'question9.1' : sayArray = ['Congratulations!🥳 You got this question right.'];
            break;
        }
        sayArray.push('Let us look at the car in more depth.🚗',
            {attachment: 'image', url: 'https://i.imgur.com/bDwtKWv.jpg'},
            'At time t=0, the car is moving towards the car with force F.',
            'At time t=1, the car hits the wall with this force and is at a dead stop for an instant.🚗',
            'At time t=2, the car is moving the opposite direction with the same force F.',
            'The bumper car and the wall are called an action-reaction pair.🙂',
            'Now let’s look at something even smaller that we experience every day.',
            'When I walk on the sidewalk,🚶️ my feet are placing a force F on the concrete. And what keeps me from falling through the sidewalk? The sidewalk is actually pushing back up on my feet');
        say(sayArray).then(() => {
                sendButton('This is another example of an action-reaction pair. What can be said of the force that the sidewalk is exerting on my feet as I walk? 🚶️ \n A. It is equal to F, the force I am exerting on the sidewalk, but we cannot know the direction. \n B. It is in the opposite direction of F, but we cannot know the magnitude of the force exerted by the sidewalk. \n C. All of the above, it is EQUAL and OPPOSITE to the force F that I exert on the sidewalk.', [
                    {title: 'A.', payload: '{"action":"question11.0"}'},
                    {title: 'B.', payload: '{"action":"question11.0"}'},
                    {title: 'C.', payload: '{"action":"question11.1"}'}]);
                });
        }
        
    // intro to the quiz, option to review
    if (action === 'question11.0' || action === 'question11.1' || action === 'goback') {
        switch (action) {
            case 'question11.0' : sayArray = ['Incorrect.❌ We can determine both the magnitude and direction of this force based on the information given. The correct answer is that the force is EQUAL and OPPOSITE to the force F that I exert on the sidewalk.', 'Regardless, you have completed the Third Law lesson!'];
            break;
            case 'question11.1' : sayArray = ['Congratulations!🥳 This is the correct answer. You have completed the Third Law lesson!'];
            break;
        }
        sayArray.push('Now you can select to take the quiz, or review material.');
        say(sayArray).then(()=> {
            sendButton('You can move on to the quiz, or go back to review a section. Please select an option below.', [
                {title: 'Quiz', payload: '{"action":"quiztime"}'},
                {title: 'Review Normal Force', payload: '{"action":"nfreview"}'},
                {title: 'Review Action and Reaction Pairs', payload: '{"action":"pairsreview"}'}]);
            });
    }
        
    // Quiz 
    if (action === 'quiztime') {
        var positivepoint = JSON.parse(payload);
        var negativepoint = JSON.parse(payload);
           
        positivepoint.score = positivepoint.score + 1;
        positivepoint.quiz = positivepoint.quiz + 1;
            
        negativepoint.quiz = negativepoint.quiz + 1;
        if (quiz == 1)
        say('You need to score a 3 on this quiz to move past the Third Law section. Otherwise you can review, or test again.👍').then(() => {
            sendButton('The normal force is _______ to the surface it is applied to.', [
                    {title: 'parallel', payload: JSON.stringify(negativepoint)},
                    {title: 'perpendicular', payload: JSON.stringify(positivepoint)},
                    {title: 'tangent to', payload: JSON.stringify(negativepoint)}]);}
            );
            
        if (quiz == 2) {
            sendButton('If I am jumping up and down, the normal force from the floor is _______ than the normal force if I am just standing.', [
                {title: 'less than', payload: JSON.stringify(negativepoint)},
                {title: 'equal to', payload: JSON.stringify(negativepoint)},
                {title: 'greater than', payload: JSON.stringify(positivepoint)},
                {title: 'cannot be determined', payload: JSON.stringify(negativepoint)}]);
        }
        if (quiz == 3) {
            sendButton('If I throw a basketball at the wall and it bounces off, the _____ applied the force that made the ball bounce back towards me.🏀', [
                {title: 'the ball', payload: JSON.stringify(negativepoint)},
                {title: 'the wall', payload: JSON.stringify(positivepoint)},
                {title: 'the floor', payload: JSON.stringify(negativepoint)},
                {title: 'me', payload: JSON.stringify(negativepoint)}]);
        } 
        if (quiz == 4) {
            sendButton('If I push a box with a force of 6 Newtons south, and Isaac Newton pushes the same box with a force of 8 Newtons south, what is the net force and direction of the box?📦', [
                {title: '2 Newtons south', payload: JSON.stringify(negativepoint)},
                {title: '8 Newtons north', payload: JSON.stringify(negativepoint)},
                {title: '10 Newtons north', payload: JSON.stringify(negativepoint)},
                {title: '14 Newtons south', payload: JSON.stringify(positivepoint)}]);
        }
        if (quiz > 4) {
            if (score < 3) {
                say('Your quiz score is' + quiz + '. Unfortunately, this is not a passing score.').then(() => {
                    sendButton('Would you like to continue working on Law 3 (review or retest) to master the material?', [
                         {title: 'Yes', payload: '{"action":"goback"}'},
                        {title: 'No thanks, I would like to be finished with the game.', payload: '{"action":"4"}'},
                        {title: 'I would like to learn a different law.', payload: '{"action":"1f"}'}]);
                });
            } else {
                say(['Congratulations!🤩 This is a passing score. You have mastered the third law of motion!👍', 'Congratulations on completing all three laws!']).then(() => {
                    sendButton('Would you like to go back and review another law?', [{title: 'Yes', payload: '1f'}, {title: 'No', payload: '2f'}]);
                    
                });
            }
        }
    }


    if (action === '4') {
        say('Thank you for playing the Newton\'s Three Laws Game! We hope you learned something today!');
    }
    if (action === '1f') {
        say('Ok, let\'s review!').then(() => {sendButton('Which law would you like to learn about again?', [{title: 'Introduction', payload: '{"action" : "0"}'}, {title: 'Newton\'s 1st Law', payload: '{"action" : "1"}'}, {title: 'Newton\'s 2nd Law', payload: '{"action" : "2"}'}, {title: 'Newton\'s 3rd Law', payload: '{"action" : "3"}'}]);
    });
    }
    if (action === '2f') {
        say('Congratulations on completing the course! Thank you for playing and we hope you learned something about Newton\'s Three Laws!');
    }
};


module.exports = {
	filename: 'greetings',
	title: 'Newton\'s Three Laws',
	introduction: 'Hi 🙂! Welcome to today\'s lesson! Today we will be learning about Newton\'s Three Laws.',
	start: start,
	state: state
};



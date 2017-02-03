/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
        http://aws.amazon.com/apache2.0/
    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/



/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.60361f9f-ef90-43a7-a0de-39e4f0772bad"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var http = require('http');

/**
 * CricketSkill is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var CricketSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
CricketSkill.prototype = Object.create(AlexaSkill.prototype);
CricketSkill.prototype.constructor = CricketSkill;

CricketSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("CricketSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

CricketSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("CricketSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    //var speechOutput = "Welcome to covisint car kit, built on Covisint platform.";
   // var repromptText = "You can say vehicle commands like start the engine ";
    //response.ask(speechOutput, repromptText);
};

CricketSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("CricketSkill onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

CricketSkill.prototype.intentHandlers = {
    // register custom intent handlers

"CricketSkillIntent": function (intent, session, response) {
        //response.tellWithCard("Hello World!", "Hello World", "Hello World!");
        //var cmd = ""; 
        //var sensorSlot = intent.slots.sensor;
  var username = 'dfdfdfdx';
  var urlPath = 'https://cricapi.com/api/cricket?apikey=t0pCDpe6UHSj54ZfbFqWZ12bJHo1';
  var https= require('https');
  var allout = false;
  var SELTEAM = intent.slots.team;
  var teamPlaying = false;
  var responseText = "Getting cricket score updates";
  https.get(urlPath, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //var livejson = JSON.parse(matchdata);
    //console.log(matchdata);
    //var matchjsons = JSON.parse(matchdata.data);
   /* matchdata.data.forEach(function(md) {
    console.log(md.description + " - to grab more details, simply use the unique_id " + md.unique_id + " with the cricketScore api!");
  });*/
  //console.log(matchjsons);
  res.on('data', function (chunk) {
       // console.log('BODY: ' + chunk);
        var cricketLiveJson = chunk;
        //console.log(chunk);
        if (res.statusCode == 200){
            // console.log("success");
            // console.log("status string ="+chunk);
             var livejson = JSON.parse(chunk);
             var livejsondata = livejson.data;
             //console.log (livejsondata);
            for (var key in livejsondata) {
                if (livejsondata.hasOwnProperty(key)) {
                  var teams = livejsondata[key].description;
                  var teamarray = teams.split(' v ');
                  //console.log(teamarray);

                var matchID = livejsondata[key].unique_id; 
                  //console.log(teams);
                    if (teamarray[0].toUpperCase().startsWith(SELTEAM.toUpperCase()) || teamarray[1].toUpperCase().startsWith(SELTEAM.toUpperCase())){
                      teamPlaying = true;
                      //console.log("true");
                      var matchURL = "https://cricapi.com/api/cricketScore?apikey=t0pCDpe6UHSj54ZfbFqWZ12bJHo1&unique_id="+matchID;
                      //console.log(matchURL);
                      https.get(matchURL, function(res2) {
                          res2.on('data', function (chunk2) { 
                              //console.log(res2.statusCode)
                              if (res.statusCode == 200){
                         //console.log("success2");
                        // console.log("status string ="+chunk);
                         var matchjson = JSON.parse(chunk2);
                         console.log(matchjson);
                         latestheadlines = "Latest score update for "+ matchjson['team-1']+ " vs "+matchjson['team-2']+" "+matchjson.type+" cricket match.";
                         inningsreqmt = matchjson['innings-requirement']
                        // console.log('innings='+inningsreqmt);
                         var matchjsondata = matchjson.score;
                         var matchstarted = matchjson.matchStarted;
                         console.log (matchstarted);
                                     if (matchstarted == true){
                         var score = matchjsondata.split(' ');
                         var runwickets = score[1];
                                                // console.log(runwickets);
                         var runarray = runwickets.split('/');
                         currentteam = score[0];
                         //console.log("current team="+currentteam);
                         currentteamruns = runarray[0];
                         //console.log("currentruns="+currentteamruns);
                         currentwickets = runarray[1];
                         if (currentwickets == undefined){
                          //console.log("current team is allout");
                          allout = true;
                         }else {
                          // console.log("wickets="+runarray[1]);
                         }  
                         var overs = score[2].split('(');
                         overs = overs[1].replace(',','');
                         //console.log("overs="+overs[1]);
                         var players = matchjsondata.split(',');
                        // console.log(players.length);
                        // console.log(players)
                         player1 = players[1].split(' ');
                         batsmen1 = player1[1]+player1[2];
                         batsmen1score = player1[3].replace('*','');
                        // console.log(batsmen1);
                         //console.log(batsmen1score);
                         //console.log (player1[1]+player1[2]);
                         //console.log (player1[3].replace('*',''));
                        // console.log(players[1].split(' '));
                         player2 = players[2].split(' ');
                         //console.log(player2);
                         if ((player2.toString()).includes('/')){
                                        
                          //console.log (player2[1]+player2[2]);
                          //console.log (player2[3].replace(')',''));
                          bowlingfiguresarray = (player2[3].replace(')','')).split('/');
                           //console.log(bowlingfiguresarray);
                           bowlerwickets = bowlingfiguresarray[0];
                           bowlerruns = bowlingfiguresarray[1];
                           //console.log ("bowler wickets="+bowlerwickets);
                                         //console.log ("bowler runs="+bowlerruns);
                          //bowlingfigures = 
                       }    
                         else {
                          // console.log (player2[1]+player2[2]);
                          // console.log (player2[3].replace('*',''));
                           batsmen2 = player2[1]+player2[2];
                           batsmen2score = player2[3].replace('*','');
                           //console.log(batsmen2);
                             //console.log(batsmen2score);
                           //console.log(players[2].split(' ').);
                           player3 = players[3].split(' ');
                           //console.log (player3[1]+player3[2]);
                           bowler = player3[1]+player3[2];
                           //console.log(bowler);
                           //console.log (player3[3].replace(')',''));
                           bowlingfiguresarray = (player3[3].replace(')','')).split('/');
                           //console.log(bowlingfiguresarray);
                           bowlerwickets = bowlingfiguresarray[0];
                           bowlerruns = bowlingfiguresarray[1];
                           //console.log ("bowler wickets="+bowlerwickets);
                                         //console.log ("bowler runs="+bowlerruns);

                       }
                       if (allout) { 

                        responseText = latestheadlines+" "+inningsreqmt+ ", "+currentteam+" "+currentteamruns+" all out in "+overs+ " overs"; 
                         console.log("allout")
                         response.tellWithCard(responseText);
                         //console.log (latestheadlines+" "+inningsreqmt+ ", "+currentteam+" "+currentteamruns+" all out in "+overs+ " overs");
                       } else {
                        responseText = latestheadlines+" "+inningsreqmt+ ", "+currentteam+" "+currentteamruns+" for " +currentwickets+ " in "+overs+" overs";
                        console.log("not all out")
                        response.tellWithCard(responseText);
                        //console.log(latestheadlines+" "+inningsreqmt+ ", "+currentteam+" "+currentteamruns+" for " +currentwickets+ " in "+overs+" overs");
                       }   
                         //console.log("hello");
                         //var

                                  } else {

                                      responseText = latestheadlines+" "+" Match has not started yet. Schedule to start at "+matchjson.dateTimeGMT+" GMT.";
                                      console.log("match has not started");
                                      response.tellWithCard(responseText);
                                  }


                    } else {
                                      responseText = "Unable to fetch requested cricket score update";
                                      response.tellWithCard(responseText);
                                      console.log(responseText);
                    }   
                });    
                        
                        
                      }); 
                    } 
                      
                 } 
            }       
        } else {
          responseText = "Unable to fetch requested cricket score update";
          //response.
          console.log("unable to fetch update")
          response.tellWithCard(responseText)
        }
      
   });
    
    //console.log(responseText);
   
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      //res.setEncoding('utf8');
      
    });
     if (teamPlaying == false){
      responseText = "your favorite team is not playing today";
      console.log(responseText);
     }
    
        
   },
    "CricketSkillHelpIntent": function (intent, session, response) {
        response.ask("You can ask for latest score updates about favorite cricket team");
    }    
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the CricketSkill skill.
    var jcar = new CricketSkill();
    jcar.execute(event, context);
};
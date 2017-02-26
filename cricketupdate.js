  var username = 'dfdfdfdx';
  var urlPath = 'https://cricapi.com/api/cricket?apikey=t0pCDpe6UHSj54ZfbFqWZ12bJHo1';
  var https= require('https');
  var allout = false;
  var SELTEAM = "SRI LANKA"
  var teamPlaying = false;
  var responseText = "Getting cricket score updates";
  var c = 0;
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
             console.log (livejsondata.length);
            for (var key in livejsondata) {
                if (livejsondata.hasOwnProperty(key)) {
                  var teams = livejsondata[key].description;
                  var teamarray = teams.split(' v ');
                  //console.log(teamarray);

                var matchID = livejsondata[key].unique_id; 
                  //console.log(teams);
                    if (((teamarray[0].toUpperCase().indexOf(SELTEAM.toUpperCase())) == 0) || ((teamarray[1].toUpperCase().indexOf(SELTEAM.toUpperCase())) == 0)){
                     	teamPlaying = true;
                     	//console.log("true");
                     	var matchURL = "https://cricapi.com/api/cricketScore?apikey=t0pCDpe6UHSj54ZfbFqWZ12bJHo1&unique_id="+matchID;
                     	//console.log(matchURL);
                     	https.get(matchURL, function(res2) {
                     	    res2.on('data', function (chunk2) {	
	                            //console.log(res2.statusCode)
	                            if (res.statusCode == 200){
	                            	c = c +1;
						             console.log(c);
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
						             console.log(score[2]);
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
						             console.log("overs="+overs[1]);
						             overs = overs[1].replace(',','');
						             
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
						             if ((player2.toString()).indexOf('/') !== -1){
                                        
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
							           console.log(responseText)
							           //console.log (latestheadlines+" "+inningsreqmt+ ", "+currentteam+" "+currentteamruns+" all out in "+overs+ " overs");
							         } else {
							         	responseText = latestheadlines+" "+inningsreqmt+ ", "+currentteam+" "+currentteamruns+" for " +currentwickets+ " in "+overs+" overs";
							         	console.log(responseText)
							         	//console.log(latestheadlines+" "+inningsreqmt+ ", "+currentteam+" "+currentteamruns+" for " +currentwickets+ " in "+overs+" overs");
							         }   
						             //console.log("hello");
						             //var

                                  } else {

                                  	  responseText = latestheadlines+" "+" Match has not started yet. Schedule to start at "+matchjson.dateTimeGMT+" GMT.";
                                  	  console.log(responseText);
                                  }
                                     


						        } else {
                                      responseText = "Unable to fetch requested cricket score update";
                                      console.log(responseText);
						        }   
						    });
						    res2.on('end', function() {
						        console.log("end of second response");
						    }); 

						       
                        
                     		
                     	});	
                    } 
                      
                 } 
            }       
        } else {
          responseText = "Unable to fetch requested cricket score update";
        }
      
   });

   res.on('end', function() {
						        console.log("end of first response="+teamPlaying);
						    });
    
    //console.log(responseText);
   
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      //res.setEncoding('utf8');
      
    });
   if (teamPlaying == false){
   	responseText = "your favorite team is not playing today";
   	console.log(responseText);
   }
    
     

   /* req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });*/

    // write data to request body
    //req.write('data\n');
    //req.write('data\n');
    //req.end();    
        

    
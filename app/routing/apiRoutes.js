// Dependencies
var friends = require('../data/friends.js');

module.exports = function(app) {

    // Get the api/friends route
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    // Post for the api/friends route
    app.post('/api/friends', function(req, res) {
    		// Set variables only needed for the post
        var difference = 50;
        var matchName = '';
        var matchPhoto = '';

        // Loop to go through the data in friends.js to find a match
        friends.forEach(function(friend) {
        		// Variables to compare matches
            var matchedScoresArray = [];
            var totalDifference = 50;

            // Function to assist in the addition reduce() below
            function add(total, num) {
                return total + num;
            }

            // Loop to through each item of the scores arrays
            // from both existing friend and the new user, 
            // and then push the new value to the matchedScoresArray
            for (var i = 0; i < friend.scores.length; i++) {
                matchedScoresArray.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i])));

            }

            // Make a matchScoresArray a single value 
            totalDifference = matchedScoresArray.reduce(add, 0);

			// If the value above is smaller than the previous difference
			// make it as previous difference, and match a friend 
            if (totalDifference < difference) {
                difference = totalDifference;
                matchName = friend.name;
                matchPhoto = friend.photo;
            }
        });
		// The match with the least difference will be sent back to client 
        res.json({
            name: matchName,
            photo: matchPhoto
        });

        friends.push(req.body);
    });
}
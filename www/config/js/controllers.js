angular.module('starter.controllers', [])

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
})

.controller('ConfigCtrl', ['$scope', '$http', '$ionicLoading', '$timeout',
function ($scope, $http, $ionicLoading, $timeout) {
    $scope.searchData = $scope.searchData || {
        query: "",
        results: {}
    };
    
    // return channel to widget
    $scope.returnChannel = function(channel) {
        //ionic.Platform.exitApp();
        //window.close();
        //$scope.showSpinner("Loading widget...");
        document.location.href = "done?" + channel.channelId + ";" + channel.channelTitle;
    }
	
	// show toast message
	$scope.showMessage = function(message) {
		$ionicLoading.show({ template: message, animation: "fade-in", noBackdrop: true, duration: 1000 });
	}
    
    // show loading spinner
    $scope.showSpinner = function(message) {
        $ionicLoading.show({
            template: "<ion-spinner></ion-spinner><p class='spinnerText'>" + message + "</p>",
            animation: "fade-in",
            showBackdrop: false,
            duration: 10000
        });
    }
    
    // get API key for channel search
    $scope.getSearchKey = (function() {
        var keys = [ "AIzaSyAkedClIJENM-lKk5Hwziprb_E9G5bKopc", "AIzaSyDdck0LEAXOCBVKDpN4ZgxC0Gk6zBedOTM", "AIzaSyBiwDi5co4t3Fopz9oEcfoisthYZz_kivM", "AIzaSyAm3hJqTq1L1wcz-cz_4zLUNs2PD37hLuY", "AIzaSyC_oqi_gbXaI29dkJJMRs0a82OWcl-h3tU" ];
        var index = Math.floor(new Date().getTime() / 1728e4) % 5;
        //var index = 0;
        return function(getNewKey) {
            if (getNewKey)
                index = (index + 1) % 5;
            else
                return keys[index];
        }
    })();
    
    // get API key for subscriber count
    $scope.getSubKey = (function() {
        var keys = [ "AIzaSyCRtJ2uhgYe7p3J-QkC6kHsm7KZz0bDIok", "AIzaSyCo-PwQAtlrchgSAY0hLnE2HYSRhqdsPXk", "AIzaSyC7asPTom1oZVPmZu7UcttGNFvqzRWQiRM", "AIzaSyDmUVXdKMQfp1428NsX0GuBHEp3Hh6VnRQ", "AIzaSyB0uq8HHarCnpYG4pZxYPwE8wLAtM_gBN0", "AIzaSyCgp_Uc2jj1mAd7HW9AzAATt33rGkvttVQ", "AIzaSyDUUfmvtaHY3lQ11CbkF8gplSJSXwgLe2g", "AIzaSyDzUqDdCGrb5g5YU0fo0pB9QbqurkK3GSc", "AIzaSyBgcyeGD9VK-Nu2pnlP5VQaLWqYSIPWZRk", "AIzaSyAGry7aVXPytGcqt-GrOb4HkIXVGbuL4As", "AIzaSyAiWjUpPAvVy1fLj2VTJitH56Gs-2PBMLY", "AIzaSyA2bieaAnufzw9YNibt0R2WI14L8uU9tbw", "AIzaSyDpTfaINBOTi_1YgYSmk25DPS8ex-duZsQ", "AIzaSyAGFMcByfMdsbQbpK7FE8MfHLZNjMDIWsw", "AIzaSyCLuua085lVPXp0Jmqb_AIePC0hG66N_5U", "AIzaSyDGu5pdf-_0cNIZdNkcLKtdpn0UNulX7hU", "AIzaSyDY8suw3_q3zMX6ZDhdr7IDpPLQ6CbEsoY", "AIzaSyCE9cyVSRDrn0nCjO_ajRDSHXUr3yqLnT0", "AIzaSyACVbv1wiiFdYQsaMQkthBJAUi-Ek-ZNkc", "AIzaSyANLBp5fHf-XEsQnksu_-ygJMHviGQO7TY", "AIzaSyCQXeXdjhu5SKnvLJeYz9SgyKbzT8fnQko", "AIzaSyBlSrOJ-ajuFM4cRpbPbuBnI1Fn3BPFrbg", "AIzaSyC9jt3y7ygY5qTToSUEanHCyMYonkCXz1w", "AIzaSyA5dmZA8HwtRCI24FDlf4E0atZ5KjYxzWA", "AIzaSyBBjLqNnzhnJ5xqRGwfdCmIVG13YNNNk2w", "AIzaSyACZdXbrIijp3kLgAGNIdSCe7uxxIvo9wY", "AIzaSyBKDw28djiaVr2rFLUUHEO2gNoa4SBa5Eo" ];
        var index = Math.floor(new Date().getTime() / 32e5) % 27;
        //var index = 0;
        return function(getNewKey) {
            if (getNewKey)
                index = (index + 1) % 27;
            else
                return keys[index];
        }
    })();
    
    // get subscriber count
    $scope.getSubCount = function(t, callback) {
        var e = t.length < 24 ? "forUsername" : "id";
        url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&" + e + "=" + t + "&fields=items/statistics/subscriberCount&key=";
        $http({
            method: "GET",
            url: url + $scope.getSubKey()
        }).then(function(response) {
            //console.log(response);
            //$ionicLoading.hide();
            callback(response.data.items[0].statistics.subscriberCount);
        }, function(error) {
            //console.log(response);
            if (error.status == 403)
            {
                // API quota exceeded
                $scope.getSubKey(true);
                $scope.getSubCount(t, callback);
            }
            else
                $scope.showMessage("Error: no Internet connection");
        });
    }
    
    // get channel's title
    $scope.getNameAndIcon = function(id) {
        //$scope.showMessage("id: " + id);
        return new Promise(function(resolve, reject) {
            url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + id + "&type=channel&fields=items/snippet&key=";
            $http({
                method: "GET",
                url: url + $scope.getSearchKey()
            }).then(function(response) {
                if (response.data.items.length > 0)
                {
                    resolve({ channelId: id, channelTitle: response.data.items[0].snippet.title, thumbnail: response.data.items[0].snippet.thumbnails.default.url})
                }
                else
                {
                    reject(new Error("channel not found"));
                }
            }, function(error) {
                //reject(new Error("there's something wrong with the YouTube Data API"));
                reject(error);
            });
        });
    }
    
    // search for a channel
    $scope.search = function(t) {
        // hide keyboard
        if (window.cordova)
        {
            cordova.plugins.Keyboard.close();
        }
        $scope.showSpinner("Searching...");
        // if query is a channel URL, find the channel ID and go straight to that channel
        if (t.indexOf("youtube.com/") != -1)
        {
            //console.log("it's a channel url");
            $http({
                method: "GET",
                url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url=%22" + t + "%22%20and%20xpath=%22//meta[@itemprop%20=%20%27channelId%27]%22&format=json"
            }).then(function(response) {
                var data = response.data.query;
                if (data.count == 0)
                {
                    $scope.showMessage("Error: channel not found");
                }
                else
                {
                    //console.log(data.results.meta[0].content);
                    //$scope.showMessage("Channel: " + data.results.meta[0].content);
                    $scope.getNameAndIcon(data.results.meta[0].content).then(function(channel) {
                        /*$scope.goToChannel(channel);
                        $scope.modal.hide();*/
                        //$scope.showMessage("id: " + channel.channelId + ", title: " + channel.channelTitle);
                        $scope.returnChannel(channel);
                    }, function(error) {
                        if (error.status == 403)
                        {
                            $scope.getSearchKey(true);
                            $scope.search(t);
                        }
                        else
                            //callback(false);
                            $scope.showMessage("Error: no Internet connection");
                    });
                }
            });
        }
        // if query is a channel ID, go straight to that channel
        else if (t.match(/^UC[A-Za-z0-9\-\_]{22}$/))
        {
            //console.log("it's a channel id");
            $scope.getNameAndIcon(t).then(function(channel) {
                /*$scope.goToChannel(channel);
                $scope.modal.hide();*/
                $scope.returnChannel(channel);
            }, function(error) {
                if (error.status == 403)
                {
                    $scope.getSearchKey(true);
                    $scope.search(t);
                }
                else
                    //callback(false);
                    $scope.showMessage("Error: no Internet connection");
            });
        }
        else
        {
            url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + t + "&type=channel&fields=items/snippet&maxResults=10&key=";
            $http({
                method: "GET",
                url: url + $scope.getSearchKey()
            }).then(function(response) {
                $ionicLoading.hide();
                //$scope.channelId = response.data.items[0].snippet.channelId;
                //$scope.name = response.data.items[0].snippet.title;
                //update($scope.channelId);
                if (response.data.items.length > 0)
                {
                    $scope.searchData.results = response.data.items;
                    //console.log($scope.results);
                    $scope.searchData.results.forEach(function(result) {
                        $scope.getSubCount(result.snippet.channelId, function(count) {
                            result.subscriberCount = count;
                        });
                    });
                }
                else
                    $scope.showMessage("Error: channel not found");
            }, function(error) {
                if (error.status == 403)
                {
                    $scope.getSearchKey(true);
                    $scope.search(t);
                }
                else
                    $scope.showMessage("Error: no internet connection");
            });
        }
    }
}]);
angular.module('app.controllers', [])

.run(function($rootScope, $state, $http, $ionicLoading, $interval) {
    // globals
    if (window.localStorage.getItem("inAppNotifs"))
    {
        $rootScope.inAppNotifs = JSON.parse(window.localStorage.getItem("inAppNotifs"));
    }
    else
    {
        /*$rootScope.inAppNotifs = [{
            message: "Notification 1",
            channel: {
                channelTitle: "PsychoSoprano",
                channelId: "UCR-QYzXrZF8yFarK8wZbHog",
                thumbnail: "https://yt3.ggpht.com/-5nmY1TTxeVQ/AAAAAAAAAAI/AAAAAAAAAAA/PberiphHWm4/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            read: false
        }, {
            message: "Notification 2",
            channel: {
                channelTitle: "PsychoSoprano",
                channelId: "UCR-QYzXrZF8yFarK8wZbHog",
                thumbnail: "https://yt3.ggpht.com/-5nmY1TTxeVQ/AAAAAAAAAAI/AAAAAAAAAAA/PberiphHWm4/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            read: false
        }];*/
        $rootScope.inAppNotifs = [];
        window.localStorage.setItem("inAppNotifs", angular.toJson($rootScope.inAppNotifs));
    }
    if (window.localStorage.getItem("unreadNotifs"))
    {
        $rootScope.unreadNotifs = window.localStorage.getItem("unreadNotifs");
    }
    else
    {
        $rootScope.unreadNotifs = 0;
        window.localStorage.setItem("unreadNotifs", $rootScope.unreadNotifs);
    }
    if (window.localStorage.getItem("favs"))
    {
        $rootScope.favs = JSON.parse(window.localStorage.getItem("favs"));
    }
    else
    {
        $rootScope.favs = [];
        window.localStorage.setItem("favs", angular.toJson($rootScope.favs));
    }
	//$rootScope.results = [];
    if (window.localStorage.getItem("settings"))
    {
        $rootScope.settings = JSON.parse(window.localStorage.getItem("settings"));
    }
    else
    {
        $rootScope.settings = {
			nightMode: false,
			sound: false,
            screenshot: false,
            favIcons: false,
            notifIcons: false,
            transition: true,
            livecountsIcon: true,
            viewButton: true
		};
        window.localStorage.setItem("settings", angular.toJson($rootScope.settings));
    }
    if (window.localStorage.getItem("notifs"))
    {
        $rootScope.notifs = JSON.parse(window.localStorage.getItem("notifs"));
    }
    else
    {
        $rootScope.notifs = {};
        window.localStorage.setItem("notifs", angular.toJson($rootScope.notifs));
    }
    
    // get API key for channel search
    $rootScope.getSearchKey = (function() {
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
    $rootScope.getSubKey = (function() {
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
    
    // changes the channel
    $rootScope.goToChannel = function(channel) {
        $state.go('tabsController.livecounts');
        $rootScope.$broadcast("channelChange", channel);
    }
    
    // get subscriber count
    $rootScope.getSubCount = function(t, callback) {
        var e = t.length < 24 ? "forUsername" : "id";
        url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&" + e + "=" + t + "&fields=items/statistics/subscriberCount&key=";
        $http({
            method: "GET",
            url: url + $rootScope.getSubKey()
        }).then(function(response) {
            //console.log(response);
            //$ionicLoading.hide();
            callback(response.data.items[0].statistics.subscriberCount);
        }, function(error) {
            //console.log(response);
            if (error.status == 403)
            {
                // API quota exceeded
                $rootScope.getSubKey(true);
                $rootScope.getSubCount(t, callback);
            }
            else
                $rootScope.showMessage("Error: no Internet connection");
        });
    }
    
    // check if subscriber count is hidden
    $rootScope.isSubCountHidden = function(t, callback) {
        var e = t.length < 24 ? "forUsername" : "id";
        url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&" + e + "=" + t + "&fields=items/statistics/hiddenSubscriberCount&key=";
        $http({
            method: "GET",
            url: url + $rootScope.getSubKey()
        }).then(function(response) {
            //console.log(response);
            //$ionicLoading.hide();
            callback(response.data.items[0].statistics.hiddenSubscriberCount);
        }, function(error) {
            //console.log(response);
            if (error.status == 403)
            {
                // API quota exceeded
                $rootScope.getSubKey(true);
                $rootScope.isSubCountHidden(t, callback);
            }
            else
                $rootScope.showMessage("Error: no Internet connection");
        });
    }
	
	// show toast message
	$rootScope.showMessage = function(message) {
		$ionicLoading.show({ template: message, animation: "fade-in", noBackdrop: true, duration: 1000 });
	}
    
    // get channel's title and thumbnail
    $rootScope.getNameAndIcon = function(id) {
        return new Promise(function(resolve, reject) {
            url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + id + "&type=channel&fields=items/snippet&key=";
            $http({
                method: "GET",
                url: url + $rootScope.getSearchKey()
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
	
	// delete a favorite
    $rootScope.deleteFav = function(fav) {
        // are you sure?
        /*var confirmDelete = $ionicPopup.confirm({
            title: "Delete favorite",
            template: "Are you sure you want to delete this favorite?"
        });
        
        confirmDelete.then(function(res) {
            if (res)
            {
                // stop auto-updating, then delete favorite
                if (angular.isDefined($rootScope.updaters[fav.channelId]))
                {
                    // stop updating
                    $interval.cancel($rootScope.updaters[fav.channelId]);
                    $rootScope.updaters[fav.channelId] = undefined;
                }
                $rootScope.favs.splice($rootScope.favs.indexOf(fav), 1);
                window.localStorage.setItem("favs", angular.toJson($rootScope.favs));
            }
        });*/
        
        // stop auto-updating, deregister notification, then delete favorite
        if (angular.isDefined($rootScope.updaters[fav.channelId]))
        {
            // stop updating
            $interval.cancel($rootScope.updaters[fav.channelId]);
            $rootScope.updaters[fav.channelId] = undefined;
        }
        // deregister notification if necessary
        if ($rootScope.notifs.hasOwnProperty(fav.channelId))
        {
            if ($rootScope.notifs[fav.channelId].notify || $rootScope.notifs[fav.channelId].notifyClose)
            {
                $scope.deregister(fav, $rootScope.notifs[fav.channelId].milestone, $rootScope.notifs[fav.channelId].subsAway).catch(function(error) {
                    $rootScope.showMessage(error);
                });
            }
            delete $rootScope.notifs[fav.channelId];
            window.localStorage.setItem("notifs", angular.toJson($rootScope.notifs));
        }
        // locate the favorite
        /*var index = $rootScope.favs.findIndex(function(item) {
            return fav.channelId == item.channelId;
        });*/
        var index = 0;
        while (index < $rootScope.favs.length && $rootScope.favs[index].channelId != fav.channelId)
        {
            index++;
        }
        //console.log(index);
        $rootScope.favs.splice(index, 1);
        window.localStorage.setItem("favs", angular.toJson($rootScope.favs));
    }
    
    // show loading spinner
    $rootScope.showSpinner = function(message) {
        $ionicLoading.show({
            template: "<ion-spinner></ion-spinner><p class='spinnerText'>" + message + "</p>",
            animation: "fade-in",
            showBackdrop: false,
            duration: 10000
        });
    }
    
    $rootScope.updaters = {};
    
    // count unread notifications
    /*$rootScope.countUnreadNotifs = function() {
        console.log("counting notifications");
        var count = 0;
        $rootScope.inAppNotifs.forEach(function(notif) {
            if (!notif.read)
            {
                count++;
            }
        })
        return count;
    }*/
    
    // receive notification
    /*$rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data) {
        $rootScope.showMessage("notification received");
    });*/
})

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
  
.controller('livecountsCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', '$rootScope', '$ionicLoading', '$cordovaScreenshot', '$cordovaSocialSharing', '$ionicNavBarDelegate', '$ionicTabsDelegate', '$cordovaNativeAudio', '$state', '$ionicModal', '$timeout', '$cordovaAppAvailability', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $ionicPopup, $rootScope, $ionicLoading, $cordovaScreenshot, $cordovaSocialSharing, $ionicNavBarDelegate, $ionicTabsDelegate, $cordovaNativeAudio, $state, $ionicModal, $timeout, $cordovaAppAvailability, $ionicPlatform) {
	// initialize audio
	$ionicPlatform.ready(function() {
        //console.log("ionic platform is ready");
        
        if (window.cordova) {
            /*$cordovaNativeAudio.preloadSimple('up', 'audio/pingUp.mp3').then(function(msg) {
                console.log(msg);
            }, function(error) {
                console.log(error);
            });
            $cordovaNativeAudio.preloadSimple('down', 'audio/pingDown.mp3').then(function(msg) {
                console.log(msg);
            }, function(error) {
                console.log(error);
            });*/
            
            $cordovaNativeAudio.preloadSimple('up', 'audio/pingUp.mp3');
            $cordovaNativeAudio.preloadSimple('down', 'audio/pingDown.mp3');
        }
    });
	
	// globals (sorta)
    var updateId;
    /*$scope.name = $stateParams.name;
    $scope.channelId = $stateParams.id;*/
    
    /*if (!$scope.name || !$scope.channelId || !$scope.thumbnail)
    {
        $scope.name = "PsychoSoprano";
        $scope.channelId = "UCR-QYzXrZF8yFarK8wZbHog";
        $scope.thumbnail = "https://yt3.ggpht.com/-5nmY1TTxeVQ/AAAAAAAAAAI/AAAAAAAAAAA/PberiphHWm4/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
    }*/
    
    // load YouTuber
    /*if (window.localStorage.getItem("currChannel"))
    {
        $scope.currChannel = JSON.parse(window.localStorage.getItem("currChannel"));
        update($scope.currChannel.channelId);
    }
    else
    {
        getFeatured().then(function(res) {
            $scope.currChannel = $scope.featChannel = res;
        }).catch(function(err) {
            $scope.currChannel = {
                channelTitle: "PsychoSoprano",
                channelId: "UCR-QYzXrZF8yFarK8wZbHog",
                thumbnail: "https://yt3.ggpht.com/-5nmY1TTxeVQ/AAAAAAAAAAI/AAAAAAAAAAA/PberiphHWm4/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
            }
        }).then(function() {
            window.localStorage.setItem("currChannel", angular.toJson($scope.currChannel));
            update($scope.currChannel.channelId);
        });
    }*/
    
    //console.log("controller running");
    
    // load channel
    $scope.loadChannel = function(id) {
        $rootScope.getNameAndIcon(id).then(function(channel) {
            $ionicLoading.hide();
            $scope.currChannel = channel;
            //console.log(channel);
            update($scope.currChannel.channelId);
        }, function(err) {
            if (err.status == 403)
            {
                $rootScope.getSearchKey(true);
                $scope.loadChannel(id);
            }
            else
                //callback(false);
                $rootScope.showMessage("Error: no Internet connection");
        });
    }
    
    // load front page channel
    $scope.loadFrontPageChannel = function() {
        getFeatured().then(function(res) {
            $ionicLoading.hide();
            $scope.currChannel = $scope.featChannel = res;
        }).then(function() {
            //window.localStorage.setItem("currChannel", angular.toJson($scope.currChannel));
            update($scope.currChannel.channelId);
        }).catch(function(err) {
            if (err.status == 404)
            {
                $scope.currChannel = {
                    channelTitle: "PsychoSoprano",
                    channelId: "UCR-QYzXrZF8yFarK8wZbHog",
                    thumbnail: "https://yt3.ggpht.com/-5nmY1TTxeVQ/AAAAAAAAAAI/AAAAAAAAAAA/PberiphHWm4/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
                }
            }
            else if (err.status == 403)
            {
                $rootScope.getSearchKey(true);
                $scope.loadFrontPageChannel();
            }
            else
                //callback(false);
                $rootScope.showMessage("Error: no Internet connection");
        });
    }
    
    // get initial channel from URL
    $rootScope.$on("initialChannel", function(event, args) {
        $rootScope.showSpinner("Loading channel...");
        $scope.loadChannel(args.channelId);
    });
    
    // get front page channel
    if (!$scope.currChannel)
    {
        $rootScope.showSpinner("Loading channel...");
        $scope.loadFrontPageChannel();
    }
    /*if (window.localStorage.getItem("initialChannel"))
    {
        //console.log("opened externally");
        $rootScope.getNameAndIcon(window.localStorage.getItem("initialChannel")).then(function(channel) {
            $scope.currChannel = channel;
            //console.log(channel);
            update($scope.currChannel.channelId);
            window.localStorage.removeItem("initialChannel");
            console.log("removed");
        });
    }
    else
    {
        getFeatured().then(function(res) {
            $scope.currChannel = $scope.featChannel = res;
        }).catch(function(err) {
            $scope.currChannel = {
                channelTitle: "PsychoSoprano",
                channelId: "UCR-QYzXrZF8yFarK8wZbHog",
                thumbnail: "https://yt3.ggpht.com/-5nmY1TTxeVQ/AAAAAAAAAAI/AAAAAAAAAAA/PberiphHWm4/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
            }
        }).then(function() {
            //window.localStorage.setItem("currChannel", angular.toJson($scope.currChannel));
            update($scope.currChannel.channelId);
        });
    }*/
    
    // search for YouTube channel and get first result
    $scope.searchChannel = function(t, callback) {
        $rootScope.showSpinner("Searching...");
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
                    $rootScope.showMessage("Error: channel not found");
                }
                else
                {
                    $rootScope.getNameAndIcon(data.results.meta[0].content).then(function(channel) {
                        $rootScope.goToChannel(channel);
                        callback(true);
                    }, function(error) {
                        if (error.status == 403)
                        {
                            $rootScope.getSearchKey(true);
                            $scope.searchChannel(t, callback);
                        }
                        else
                            callback(false);
                    });
                }
            });
        }
        // if query is a channel ID, go straight to that channel
        else if (t.match(/^UC[A-Za-z0-9\-\_]{22}$/))
        {
            //console.log("it's a channel id");
            $rootScope.getNameAndIcon(t).then(function(channel) {
                $rootScope.goToChannel(channel);
                callback(true);
            }, function(error) {
                if (error.status == 403)
                {
                    $rootScope.getSearchKey(true);
                    $scope.searchChannel(t, callback);
                }
                else
                    callback(false);
            });
        }
        else
        {
            url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + t + "&type=channel&fields=items/snippet&key=";
            $http({
                method: "GET",
                url: url + $rootScope.getSearchKey()
            }).then(function(response) {
                //$scope.channelId = response.data.items[0].snippet.channelId;
                //$scope.name = response.data.items[0].snippet.title;
                //update($scope.channelId);
                if (response.data.items.length > 0)
                {
                    $rootScope.$broadcast("channelChange", { channelId: response.data.items[0].snippet.channelId, channelTitle: response.data.items[0].snippet.title, thumbnail: response.data.items[0].snippet.thumbnails.default.url});
                    callback(true);
                }
                else
                    callback(false);
            }, function(error) {
                if (error.status == 403)
                {
                    $rootScope.getSearchKey(true);
                    $scope.searchChannel(t, callback);
                }
                else
                    //callback(false);
                    $rootScope.showMessage("Error: no Internet connection");
            });
        }    
    }
    
    // update subscriber count every 2 seconds
    function update(id) {
        clearInterval(updateId);
        $rootScope.getSubCount(id, function(count) {
			$scope.subs = count;
		});
        updateId = setInterval(function() {
            // only update if user is currently on Livecounts tab unless sound is on
            if ($state.current.name == "tabsController.livecounts" || $rootScope.settings.sound)
            {
                $rootScope.getSubCount(id, function(count) {
                    if (window.cordova && $rootScope.settings.sound)
                    {
                        if (count > $scope.subs)
                        {
                            //$rootScope.showMessage("up");
                            /*$cordovaNativeAudio.play("up").then(function(msg) {
                                console.log(msg);
                            }, function(error) {
                                console.log(error);
                            });*/
                            $cordovaNativeAudio.play("up");
                        }
                        else if (count < $scope.subs)
                        {
                            //$rootScope.showMessage("down");
                            /*$cordovaNativeAudio.play("down").then(function(msg) {
                                console.log(msg);
                            }, function(error) {
                                console.log(error);
                            });*/
                            $cordovaNativeAudio.play("down");
                        }
                    }
                    $scope.subs = count;
                });
            }
        }, 2000);
    }
    
    // change YouTube channel
    $scope.changeChannel = function() {
        $scope.data = {};
        
        popup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.channel" ng-enter="searchAndClose(data.channel)" autofocus>',
            title: "Enter channel name, ID, or URL:",
            scope: $scope,
            buttons: [
                { text: "Cancel" },
                {
                    text: "<b>Change</b>",
                    type: "button-positive",
                    onTap: function(e) {
                        return $scope.data.channel;
                    }
                }
            ]
        });
        
        /*popup = $ionicPopup.prompt({
            title: "Change channel",
            template: "Enter channel name, ID, or URL:",
            inputType: "text",
            buttons: [
                { text: "Cancel" },
                {
                    text: "<b>Change</b>",
                    type: "button-positive",
                    onTap: function(e) {
                        return $scope.data.channel;
                    }
                }
            ]
        });*/
        
        popup.then(function(res) {
            if (res)
            {
                $scope.searchChannel(res, function(success) {
                    if (!success)
                        $rootScope.showMessage("Error: channel not found");
                    else
                        $ionicLoading.hide();
                });
            }
        });
    }
    
    // search for channel and close the prompt
    $scope.searchAndClose = function(res) {
        popup.close();
        if (res)
        {
            $scope.searchChannel(res, function(success) {
                if (!success)
                    $rootScope.showMessage("Error: channel not found");
                else
                    $ionicLoading.hide();
            });
        }
    }
    
    // checks if channel is a favorite
    $scope.isFav = function(channel) {
        // make sure channel is defined
        return channel && $rootScope.favs.some(function(item) {
            return channel.channelId == item.channelId;
        });
    }
    
    // adds a favorite
    $scope.toggleFav = function(channel) {
        /*var exists = $rootScope.favs.some(function(item) {
            return channel.channelId == item.channelId;
        });*/
        if (!$scope.isFav(channel))
        {
            channel.update = false;
            $rootScope.favs.push(channel);
            window.localStorage.setItem("favs", angular.toJson($rootScope.favs));
            $rootScope.showMessage(channel.channelTitle + " added to favorites");
        }
        else
        {
            //message = $scope.currChannel.channelTitle + " already in favorites";
            // are you sure?
            var confirmDelete = $ionicPopup.confirm({
                title: "Delete favorite",
                template: "Are you sure you want to remove " + channel.channelTitle + " from your favorites?"
            });
            
            confirmDelete.then(function(res) {
                if (res)
                {
                    $rootScope.deleteFav(channel);
                    $rootScope.showMessage(channel.channelTitle + " removed from favorites");
                }
            });
        }
    }
	
	// share
	$scope.share = function(channel) {
		if (window.cordova)
		{
            if ($rootScope.settings.screenshot)
            {
                $cordovaScreenshot.capture().then(function(result) {
                    $scope.shareOnTwitter(channel, "file://" + result);
                }, function(err) {
                    $rootScope.showMessage("Error: failed to take screenshot");
                });
            }
            else
            {
                $scope.shareOnTwitter(channel, null);
            }
		}
	}
    
    // share on Twitter
    $scope.shareOnTwitter = function(channel, imagePath) {
        var appLink;
        if (window.cordova && cordova.platformId == "ios")
            appLink = "https://itunes.apple.com/us/app/livecounts-live-subscriber/id1185151094";
        else
            appLink = "https://play.google.com/store/apps/details?id=net.livecounts";
        $cordovaSocialSharing.shareViaTwitter("View " + channel.channelTitle + "'s live subscriber count on the Livecounts app!", imagePath, appLink).then(function(result) {
            //$rootScope.showMessage("Successfully shared on Twitter");
        }, function(error) {
            $rootScope.showMessage("Error: failed to share on Twitter");
        });
    }
	
	// show/hide header and tab bar
	$scope.showBars = function(show) {
		$ionicNavBarDelegate.showBar(show);
		$ionicTabsDelegate.showBar(show);
	}
    
    // search for a channel
    $scope.search = function(t) {
        // hide keyboard
        if (window.cordova)
        {
            cordova.plugins.Keyboard.close();
        }
        $rootScope.showSpinner("Searching...");
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
                    $rootScope.showMessage("Error: channel not found");
                }
                else
                {
                    $rootScope.getNameAndIcon(data.results.meta[0].content).then(function(channel) {
                        $ionicLoading.hide();
                        $rootScope.goToChannel(channel);
                        $scope.modal.hide();
                    }, function(error) {
                        if (error.status == 403)
                        {
                            $rootScope.getSearchKey(true);
                            $scope.search(t);
                        }
                        else
                            //callback(false);
                            $rootScope.showMessage("Error: no Internet connection");
                    });
                }
            });
        }
        // if query is a channel ID, go straight to that channel
        else if (t.match(/^UC[A-Za-z0-9\-\_]{22}$/))
        {
            //console.log("it's a channel id");
            $rootScope.getNameAndIcon(t).then(function(channel) {
                $ionicLoading.hide();
                $rootScope.goToChannel(channel);
                $scope.modal.hide();
            }, function(error) {
                if (error.status == 403)
                {
                    $rootScope.getSearchKey(true);
                    $scope.search(t);
                }
                else
                    //callback(false);
                    $rootScope.showMessage("Error: no Internet connection");
            });
        }
        else
        {
            url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + t + "&type=channel&fields=items/snippet&maxResults=10&key=";
            $http({
                method: "GET",
                url: url + $rootScope.getSearchKey()
            }).then(function(response) {
                $ionicLoading.hide();
                //$scope.channelId = response.data.items[0].snippet.channelId;
                //$scope.name = response.data.items[0].snippet.title;
                //update($scope.channelId);
                if (response.data.items.length > 0)
                {
                    $scope.searchData.results = response.data.items;
                    //console.log($rootScope.results);
                    $scope.searchData.results.forEach(function(result) {
                        $scope.getSubCount(result.snippet.channelId, function(count) {
                            result.subscriberCount = count;
                        });
                    });
                }
                else
                    $rootScope.showMessage("Error: channel not found");
            }, function(error) {
                if (error.status == 403)
                {
                    $rootScope.getSearchKey(true);
                    $scope.search(t);
                }
                else
                    $rootScope.showMessage("Error: no internet connection");
            });
        }
    }
    
    $scope.focusQuery = function() {
        $timeout(function() {
            document.getElementById("queryText").select();
        }, 0);
    }
    
    // show search modal
    $scope.showSearchModal = function() {
        $scope.searchData = $scope.searchData || {
            query: "",
            results: {}
        };
        if ($scope.modal)
        {
            $scope.modal.show();
            $scope.focusQuery();
        }
        else
        {
            $ionicModal.fromTemplateUrl("templates/search-modal.html", {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
                $scope.focusQuery();
            });
        }
    }
    
    $scope.openChannel = function(id) {
        /*if (window.cordova)
        {
            navigator.app.loadUrl("https://www.youtube.com/channel/" + id, {openExternal: true});
        }*/
        if (window.cordova)
        {
            /*var scheme;
            var data;
            if (cordova.platformId == 'ios')
            {
                scheme = "youtube://";
                data = scheme;
            }
            else if (cordova.platformId == 'android')
            {
                scheme = "com.google.android.youtube";
                data = {
                    "action": "ACTION_VIEW",
                    "package": scheme,
                    "uri": "vnd.youtube://cyunH7kuoRc"
                };
            }
            $cordovaAppAvailability.check(scheme).then(function() {
                startApp.set(data).start(function() {
                    //console.log("OK");
                }, function(error) {
                    //console.log(error);
                    $rootScope.showMessage("Error: failed to open YouTube app");
                });
                //console.log('YouTube is available');
            }, function() {
                cordova.InAppBrowser.open('https://www.youtube.com/channel/' + id, '_system', 'location=no');
                //console.log('YouTube is not available');
            });*/
            cordova.InAppBrowser.open('https://www.youtube.com/channel/' + id, '_system', 'location=no');
        }
    }
    
    // get featured YouTuber
    function getFeatured() {
        return new Promise(function(resolve, reject) {
            getFeaturedFile().then(function(response) {
                var t = response.data;
                var e = t.indexOf("\n");
                var id = t.slice(0, 24);
                var description = t.slice(e + 1);
                $rootScope.getNameAndIcon(id).then(function(res) {
                    res.descText = description;
                    resolve(res);
                }).catch(function(err) {
                    reject(err);
                });
            }).catch(function(err) {
                reject(err);
            });
        });
    }
    
    // get file containing featured YouTuber
    function getFeaturedFile() {
        return new Promise(function(resolve, reject) {
            //console.log("searching");
            var date = new Date();
            var currHour = date.getUTCHours() + 1;
            var url = "https://livecounts.net/featured/" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + "-" + date.getUTCFullYear() % 100;
            $http({
                method: "GET",
                url: url + ".txt"
            }).then(function(response) {
                // found it
                //console.log("found");
                resolve(response);
            }, function(response) {
                (function getContents(h) {
                    if (h < 0) {
                        // not found after going through all the hours
                        reject(new Error("no channels featured today"));
                    }
                    //console.log("searching for", currHour);
                    hour = "-" + h;
                    $http({
                        method: "GET",
                        url: url + hour + ".txt"
                    }).then(function(response) {
                        // found it
                        //console.log("found", h);
                        resolve(response);
                    }, function(response) {
                        // not found
                        getContents(h - 1);
                    })
                })(currHour);
            });
        });
    }
    
    $rootScope.$on("channelChange", function (event, args) {
        $scope.currChannel = args;
        if (args.thumbnails)
            $scope.currChannel.thumbnail = args.thumbnails.default.url;
        $rootScope.isSubCountHidden(args.channelId, function(hidden) {
            //console.log(hidden);
            if (hidden)
                $rootScope.showMessage("Error: subscriber count is hidden");
        });
        //window.localStorage.setItem("currChannel", angular.toJson($scope.currChannel));
        update(args.channelId);
    });
}])
   
.controller('settingsCtrl', ['$scope', '$stateParams', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope) {
	// save settings
	$scope.saveSettings = function() {
		window.localStorage.setItem("settings", angular.toJson($rootScope.settings));
	}
}])
   
.controller('infoCtrl', ['$scope', '$stateParams', '$ionicPlatform', '$cordovaAppVersion', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPlatform, $cordovaAppVersion) {
    // open Livecounts giveaway page
    $scope.openGiveawayPage = function(id) {
        if (window.cordova)
        {
            cordova.InAppBrowser.open('https://livecounts.net/giveaway/', '_system', 'location=no');
        }
    }
    
    // open Livecounts auction page
    $scope.openAuctionPage = function(id) {
        if (window.cordova)
        {
            cordova.InAppBrowser.open('https://livecounts.net/auction/', '_system', 'location=no');
        }
    }
    
    // open Livecounts Twitter account
    $scope.openLCTwitter = function() {
        if (window.cordova)
        {
            cordova.InAppBrowser.open('https://twitter.com/LivecountsSite', '_system', 'location=no');
        }
    }
    
    // open Livecounts policy policy
    $scope.openPrivacyPolicy = function() {
        if (window.cordova)
        {
            cordova.InAppBrowser.open('https://livecounts.net/privacy/', '_system', 'location=no');
        }
    }
    
    // email Livecounts
    $scope.emailToLC = function() {
        if (window.cordova)
        {
            cordova.InAppBrowser.open('mailto:livecountssite@gmail.com', '_system', 'location=no');
        }
    }
}])
   
.controller('favoritesCtrl', ['$scope', '$stateParams', '$rootScope', '$state', '$http', '$ionicPopup', '$ionicModal', '$timeout', '$interval', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $state, $http, $ionicPopup, $ionicModal, $timeout, $interval, $ionicLoading) {
    //console.log("ready");
    
    // update sub counts
	$scope.$on("$ionicView.enter", function() {
		// controls the edit, move, delete buttons
		$scope.data = {
			toggle: false
		};
		
		//console.log($rootScope.favs);
		$rootScope.favs.forEach(function(fav) {
            if (fav.update)
            {
                // auto-update sub count if not already doing so
                if (!angular.isDefined($rootScope.updaters[fav.channelId]))
                {
                    $rootScope.updaters[fav.channelId] = $interval(function() {
                        if ($state.current.name == "tabsController.favorites")
                        {
                            $rootScope.getSubCount(fav.channelId, function(count) {
                                fav.subscriberCount = count;
                            });
                        }
                    }, 2000);
                }
            }
            //else
            //{
                $rootScope.getSubCount(fav.channelId, function(count) {
                    fav.subscriberCount = count;
                    window.localStorage.setItem("favs", angular.toJson($rootScope.favs));
                });
            //}
		});
	});
	
	// move a favorite
	$scope.moveFav = function(fav, fromIndex, toIndex) {
		$rootScope.favs.splice(fromIndex, 1);
		$rootScope.favs.splice(toIndex, 0, fav);
        window.localStorage.setItem("favs", angular.toJson($rootScope.favs));
	}
    
    // register for a notification
    $scope.register = function(fav, milestone, subsAway, notifywhenReached) {
        //alert(window.localStorage.getItem("token"));
        //console.log($rootScope.token);
        $http({
            method: "GET",
            url: "https://notifications.livecounts.net/register",
            params: {
                t: $rootScope.token,
                i: fav.channelId,
                n: fav.channelTitle,
                m: milestone,
                s: subsAway,
                r: notifywhenReached
            }
        }).then(function(response) {
            if (response.status >= 200 && response.status < 400)
            {
                //$rootScope.showMessage("success");
            }
            /*else
            {
                $rootScope.showMessage("Error: the notification server is down");
            }*/
        }).catch(function(error) {
            $rootScope.showMessage("Error: the notification server is down");
        });
    }
    
    // deregister from a notification
    $scope.deregister = function(fav, milestone, subsAway) {
        //alert(window.localStorage.getItem("token"));
        return new Promise(function(resolve, reject) {
            $http({
                method: "GET",
                url: "https://notifications.livecounts.net/deregister",
                params: {
                    t: $rootScope.token,
                    i: fav.channelId,
                    n: fav.channelTitle,
                    m: milestone,
                    s: subsAway
                }
            }).then(function(response) {
                if (response.status >= 200 && response.status < 400)
                {
                    //$rootScope.showMessage("success");
                    resolve(response.data);
                }
                /*else
                {
                    //$rootScope.showMessage("Error: the notification server is down");
                    reject(new Error("the notification server is down"));
                }*/
            }).catch(function(error) {
                //console.log("something wrong");
                reject(new Error("the notification server is down"));
            });
        });
    }
    
    // show notification modal
    $scope.showNotifModal = function(fav) {
        // prepare notification modal
        $scope.notifData = {};
        $ionicModal.fromTemplateUrl("templates/notifications-modal.html", {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.currFav = fav;
            //console.log($rootScope.notifs);
            if ($rootScope.notifs.hasOwnProperty(fav.channelId))
            {
                // load setting
                $scope.notifData.notifyClose = $rootScope.notifs[fav.channelId].notifyClose;
                $scope.notifData.notify = $rootScope.notifs[fav.channelId].notify;
                $scope.notifData.milestone = $scope.notifData.oldMilestone = $rootScope.notifs[fav.channelId].milestone;
                $scope.notifData.subsAway = $scope.notifData.oldSubsAway = $rootScope.notifs[fav.channelId].subsAway;
            }
            else
            {
                // suggest a milestone if there isn't one
                $scope.notifData.notifyClose = false;
                $scope.notifData.notify = false;
                $scope.notifData.milestone = $scope.notifData.oldMilestone = $scope.nextMilestone(fav.subscriberCount);
                $scope.notifData.subsAway = $scope.notifData.oldSubsAway = $scope.subsAwayFromNextMilestone(fav.subscriberCount);
            }
            $scope.modal.show();
        });
    }
    
    // check if number is an integer (polyfill from Mozilla)
    Number.isInteger = Number.isInteger || function(value) {
        return typeof value === "number" && 
            isFinite(value) && 
            Math.floor(value) === value;
    };
    
    // save notification setting
    $scope.saveNotifSetting = function(fav, data) {
        // validate milestone
        if (!Number.isInteger(data.milestone) || !(data.milestone > 0))
        {
            $rootScope.showMessage("Error: milestone must be a positive integer");
            $scope.focusMilestone();
        }
        else if (!Number.isInteger(data.subsAway) || !(data.subsAway > 0))
        {
            $rootScope.showMessage("Error: subscribers away must be a positive integer");
            $scope.focusSubsAway();
        }
        else
        {
            $rootScope.showSpinner("Saving notification settings...");
            $rootScope.getSubCount(fav.channelId, function(count) {
                if (data.notify && count >= data.milestone)
                {
                    $rootScope.showMessage("Error: " + fav.channelTitle + " already reached " + data.milestone.toLocaleString() + " subscribers");
                    $scope.focusMilestone();
                }
                else if (data.notifyClose && count >= data.milestone - data.subsAway)
                {
                    $rootScope.showMessage("Error: " + fav.channelTitle + " is less than " + data.subsAway.toLocaleString() + " away from " + data.milestone.toLocaleString() + " subscribers");
                    $scope.focusSubsAway();
                }
                else
                {
                    // deregister old notification
                    $scope.deregister(fav, data.oldMilestone, data.oldSubsAway).then(function(response) {
                        if (response.status) // proceed if deregistration is successful
                        {
                            // if notify is enabled, register new notification
                            if (data.notifyClose)
                            {
                                $scope.register(fav, data.milestone, data.subsAway, data.notify);
                            }
                            else if (data.notify)
                            {
                                $scope.register(fav, data.milestone);
                            }
                            // save setting in notifs object
                            $rootScope.notifs[fav.channelId] = {
                                notifyClose: data.notifyClose,
                                notify: data.notify,
                                milestone: data.milestone,
                                subsAway: data.subsAway
                            };
                            window.localStorage.setItem("notifs", angular.toJson($rootScope.notifs));
                            $rootScope.showMessage("Notification settings saved");
                            $scope.modal.remove();
                        }
                        else
                        {
                            // unsuccessful
                            $rootScope.showMessage("Error: failed to save notification settings");
                        }
                    }).catch(function(error) {
                        $rootScope.showMessage(error);
                    });
                }
            });
        }
    }
    
    // next milestone
    $scope.nextMilestone = function(t) {
        if (t < 10)
        {
            return 10;
        }
        var e = t.toString();
        if (e.length > 6)
        {
            return (Math.floor(t / 1e6) + 1) * 1e6;
        }
        return (parseInt(e.charAt(0)) + 1) * Math.pow(10, e.length - 1);
    }
    
    // subs away from next milestone
    $scope.subsAwayFromNextMilestone = function(t) {
        /*if (t < 10)
        {
            return 10;
        }
        var e = t.toString();
        if (e.length > 6)
        {
            return (Math.floor(t / 1e6) + 1) * 1e6;
        }
        return (parseInt(e.charAt(0)) + 1) * Math.pow(10, e.length - 1);*/
        return 100;
    }
    
    // focus on milestone textbox
    $scope.focusMilestone = function() {
        $timeout(function() {
            document.getElementById("milestoneText").select();
        }, 0);
    }
    
    // focus on subs away textbox
    $scope.focusSubsAway = function() {
        $timeout(function() {
            document.getElementById("subsAwayText").select();
        }, 0);
    }
    
    $scope.toggleUpdateFav = function(fav) {
        fav.update = !fav.update;
        if (fav.update)
        {
            // start updating
            $rootScope.getSubCount(fav.channelId, function(count) {
                fav.subscriberCount = count;
                window.localStorage.setItem("favs", angular.toJson($rootScope.favs));
            });
            $rootScope.updaters[fav.channelId] = $interval(function() {
                if ($state.current.name == "tabsController.favorites")
                {
                    $rootScope.getSubCount(fav.channelId, function(count) {
                        fav.subscriberCount = count;
                    });
                }
            }, 2000);
        }
        else if (angular.isDefined($rootScope.updaters[fav.channelId]))
        {
            // stop updating
            $interval.cancel($rootScope.updaters[fav.channelId]);
            $rootScope.updaters[fav.channelId] = undefined;
        }
        window.localStorage.setItem("favs", angular.toJson($rootScope.favs));
    }
}])
   
/*.controller('searchCtrl', ['$scope', '$stateParams', '$rootScope', '$state', '$http', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $state, $http, $ionicLoading) {
    // search for a channel
    $scope.search = function(t) {
        $rootScope.results = [];
        url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + t + "&type=channel&fields=items/snippet&maxResults=10&key=";
        $http({
            method: "GET",
            url: url + $rootScope.getSearchKey()
        }).then(function(response) {
            //$scope.channelId = response.data.items[0].snippet.channelId;
            //$scope.name = response.data.items[0].snippet.title;
            //update($scope.channelId);
            if (response.data.items.length > 0)
            {
                $rootScope.results = response.data.items;
                //console.log($rootScope.results);
				$rootScope.results.forEach(function(result) {
					$rootScope.getSubCount(result.snippet.channelId, function(count) {
						result.subscriberCount = count;
					});
				});
            }
            else
                $rootScope.showMessage("Error: channel not found");
        });
    }
}])*/
   
.controller('notificationsCtrl', ['$scope', '$stateParams', '$rootScope', '$state', '$http', '$ionicLoading', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $state, $http, $ionicLoading, $ionicPopup) {
    // mark notification as read and go to channel
    $scope.readNotif = function(notif) {
        if (!notif.read)
        {
            notif.read = true;
            window.localStorage.setItem("inAppNotifs", angular.toJson($rootScope.inAppNotifs));
            $rootScope.unreadNotifs--;
            window.localStorage.setItem("unreadNotifs", $rootScope.unreadNotifs);
        }
        $rootScope.goToChannel(notif.channel);
    }
	
	// delete a favorite
    $scope.deleteNotif = function(notif) {
        // if unread, decrement badge
        if (!notif.read)
        {
            $rootScope.unreadNotifs--;
            window.localStorage.setItem("unreadNotifs", $rootScope.unreadNotifs);
        }
        $rootScope.inAppNotifs.splice($rootScope.inAppNotifs.indexOf(notif), 1);
        window.localStorage.setItem("inAppNotifs", angular.toJson($rootScope.inAppNotifs));
    }
    
    // clear all notifications
    $scope.clearNotifs = function() {
        // are you sure?
        var confirmDelete = $ionicPopup.confirm({
            title: "Clear notifications",
            template: "Are you sure you clear all notifications?"
        });
        
        confirmDelete.then(function(res) {
            if (res)
            {
                $rootScope.unreadNotifs = 0;
                window.localStorage.setItem("unreadNotifs", $rootScope.unreadNotifs);
                $rootScope.inAppNotifs = [];
                window.localStorage.setItem("inAppNotifs", angular.toJson($rootScope.inAppNotifs));
                $rootScope.showMessage("Notifications cleared");
            }
        });
    }
}])
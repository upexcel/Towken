(function() {
    'use strict';
    angular.module('scale')
        .factory('typeConversion', typeConversion);

    function typeConversion(Configurations) {
        var service = {};
        var towkenData = [];
        service.toNumber = function(data, decideImg) {
            _.forEach(data, function(i) {
             i.Distance = parseInt(i.Distance).toFixed(2);
                if (i.token_later) {
                    if (i.token_later - moment().unix() > 0) {
                        data = _.without(data, i);
                    } else {
                        checkFortimeRemaining();
                    }
                } else {
                    checkFortimeRemaining();
                }
                if(!i.decideImg){
                   if(!i.towken_pic){
                          i.towken_pic = Configurations.PlaceholderImg;
                          i.decideImg = true;
                        }else{
                           i.towken_pic = Configurations.ImageUrl+i.towken_pic;
                           i.decideImg = true;
                        }
                }
                function checkFortimeRemaining() {
                    if (i.time_remaining - moment().unix() <= 0) {
                         data = _.without(data, i);
                    } else {
                        i.remaining_time = i.time_remaining - moment().unix();
                        i.autostart = true;
                    }
                }
            })
            return data;
        };


        service.formatData=function(data1){
            var icon, k=0;
            var ionIcon;
               _.forEach(data1, function(i) {
                        if(i.type_of_token){
                          if(i.type_of_token == "Restaurent"){
                              icon = Configurations.restaurentMarker;
                              ionIcon = Configurations.restaurentIcon;
                          }
                          if(i.type_of_token == 'Shopping') {
                            icon = Configurations.shoppingMarker;
                            ionIcon = Configurations.shoppingIcon;
                          }
                          if(i.type_of_token == 'Saloon') {
                            icon = Configurations.saloonMarker;
                            ionIcon = Configurations.saloonIcon;
                          }   
                        }
                        i.icon = icon;
                        i.latitude =  i.geo_location[1];
                        i.longitude  = i.geo_location[0];
                        i.id = k++;
                        i.ionIcon = ionIcon;
                        i.Kms= (i.Distance*1.609344).toFixed(2);
                     });

           return data1;
 
        }
         service.getRating=function(data1){
            var icon, k=0;
            var ionIcon;
               _.forEach(data1, function(i) {
                        if(i.type_of_token){
                          if(i.type_of_token == "Restaurent"){
                              icon = Configurations.restaurentMarker;
                              ionIcon = Configurations.restaurentIcon;
                          }
                          if(i.type_of_token == 'Shopping') {
                            icon = Configurations.shoppingMarker;
                            ionIcon = Configurations.shoppingIcon;
                          }
                          if(i.type_of_token == 'Saloon') {
                            icon = Configurations.saloonMarker;
                            ionIcon = Configurations.saloonIcon;
                          }   
                        }   
                        i.icon = icon;
                        i.latitude =  i.geo_location[1];
                        i.longitude  = i.geo_location[0];
                        i.id = k++;
                        i.ionIcon = ionIcon;
                        i.Kms= (i.Distance*1.609344).toFixed(2);
                     });

           return data1;
 
        }


        return service;
    }


})();
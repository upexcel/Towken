(function() {
    'use strict';
    angular
        .module('scale')
        .controller('socialaccountsController', socialaccountsController);

    function socialaccountsController($state, $ionicActionSheet, tostService, getSocialMediaAccount,  $ionicLoading, localStorageService, $timeout,setSocialMediaAccount) {
        var self = this;
         var ionicActionSheetButtons = [{
            text: 'Gmail',
            id: 'gmail'
        }, {
            text: 'Linked In',
            id: 'linkedin'
        }]; 

        self.SocialAccounts = [{
            id: "facebook",
            img: "fb.png",
            value: ""
        }, {
            id: "twitter",
            img: "tw.png",
            value: ""
        }];
      

          $ionicLoading.show();
            var query = getSocialMediaAccount.get({
                 UserToken:localStorageService.get("UserToken").token
            });
            query.$promise.then(function(response){
              $ionicLoading.hide();
             if(response.status == 1)   {
               for(var i = 0 ; i< response.data.length; i++){
                  if(response.data[i].fbID)
                     self.SocialAccounts[0].value = response.data[i].fbID;
                  if(response.data[i].twitterID)
                      self.SocialAccounts[1].value = response.data[i].twitterID;
                  if(response.data[i].gmailID){
                   var index1;
                       for(var k=0; k<ionicActionSheetButtons.length; k++)
                         if(ionicActionSheetButtons[k].id="gmail")
                            index1=k;
                        console.log(index1)
                    self.SocialAccounts.push({
                        id: ionicActionSheetButtons[index1].text,
                        img: ionicActionSheetButtons[index1].id + ".png",
                        value: response.data[i].gmailID
                    });
                      var pulled = _.pullAt(ionicActionSheetButtons, [index1]);
                  }
                   
                  if(response.data[i].linkedInID){
                    var index;

                       for(var k=0; k<ionicActionSheetButtons.length; k++)
                         if(ionicActionSheetButtons[k].id="linkedin")
                            index=k;
                                console.log(index)
                    self.SocialAccounts.push({
                        id: ionicActionSheetButtons[index].text,
                        img: ionicActionSheetButtons[index].id + ".png",
                        value:response.data[i].linkedInID
                    });
                      var pulled = _.pullAt(ionicActionSheetButtons, [index]);
                      console.log(ionicActionSheetButtons)
                      CheckAddLink();
                      // self.SocialAccounts[3].value = response.data[i].linkedInID;
                  }
               }
             }
            });  

        self.GO = function(path) {
            $state.go(path);
        }

       

        self.AddAccountSheet = function() {
            var hideSheet = $ionicActionSheet.show({
                buttons: ionicActionSheetButtons,
                cancelText: 'Cancel',
                cancel: function() {
                    hideSheet();
                },
                buttonClicked: function(index) {
                    self.SocialAccounts.push({
                        id: ionicActionSheetButtons[index].text,
                        img: ionicActionSheetButtons[index].id + ".png",
                        value: ''
                    });
                    var pulled = _.pullAt(ionicActionSheetButtons, [index]);
                    CheckAddLink();
                    return true;
                }
            });
        }

        self.UpdateAccounts = function(SocialAccounts){
          $ionicLoading.show();
            console.log(SocialAccounts);
            var FbID, Twid, GmailId, LinkedinID;
            for(var i = 0 ; i< SocialAccounts.length; i++){
                if(SocialAccounts[i].id == 'facebook')
                    FbID =  SocialAccounts[i].value;
                
                if(SocialAccounts[i].id == 'twitter')
                    Twid = SocialAccounts[i].value;

                if(SocialAccounts[i].id == 'Gmail')
                    GmailId = SocialAccounts[i].value;

                 if(SocialAccounts[i].id == 'Linked In')
                    LinkedinID = SocialAccounts[i].value;
            }
            var query = setSocialMediaAccount.save({
                 UserToken:localStorageService.get("UserToken").token,
                 fbID: FbID,
                 twitterID: Twid,
                 gmailID: GmailId,
                 linkedInID: LinkedinID

            });
            query.$promise.then(function(response){
                $ionicLoading.hide();
                tostService.notify('Accounts updated', 'top');
                console.log(response);
            });
        }
         
  CheckAddLink();
      function CheckAddLink(){
           if(ionicActionSheetButtons.length == 0)
          self.addlink = false;
        else
          self.addlink = true;
      }
     
           


    }

})();
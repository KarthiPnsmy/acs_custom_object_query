// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var Cloud = require('ti.cloud');
Cloud.debug = true;

var win = Ti.UI.createWindow({
	title:"ACS Custom Object Example",
	backgroundColor:'#ccc'
})

var createUserBtn = Ti.UI.createButton({
	title:'Create User',
	width:110,
	top:20,
	left:20,
	height:35,
	textAlign:'center'
})
win.add(createUserBtn);

createUserBtn.addEventListener('click', function () {
  //creating sample cloud user
          Cloud.Users.create({
            username: "testuser1",
            password: "testuser1",
            password_confirmation: "testuser1",
            first_name: "test",
            last_name: "user1"
        }, function (e) {
            if (e.success) {
                var user = e.users[0];
                alert('Created! You are now logged in as ' + user.id);
                
            }
            else {
	            if (e.error && e.message) {
	                alert('Error :' + e.message);   
	            }
            }
            
        });
});


var cusObjBtn1 = Ti.UI.createButton({
	title:'Custom Object 1',
	width:130,
	top:60,
	left:20,
	height:35,
	textAlign:'center'	
})
win.add(cusObjBtn1);

cusObjBtn1.addEventListener('click', function(e) {
    Cloud.Users.login({
      login  : 'testuser1',
      password: 'testuser1',
    }, function(e) {
      if (e.success)   {

        Cloud.Objects.create({
          classname : 'books',
          fields : {
            book_id : 1,
            title : 'Javascript',
            author : 'Peter'
          }
        }, function(e) {
          if(e.success) {
            alert("created");
          } else {
            alert('Error: ' + ((e.error && e.message) || JSON.stringify(e)));
          }
        }); 
                    
      } else {
        alert('Login Error:' +((e.error && e.message) || JSON.stringify(e)));
      } 
    }); 
  }); 

var cusObjBtn2 = Ti.UI.createButton({
	title:'Custom Object 2',
	width:130,
	top:60,
	left:155,
	height:35,
	textAlign:'center'	
})
win.add(cusObjBtn2);

cusObjBtn2.addEventListener('click', function(e) {
    Cloud.Users.login({
      login  : 'testuser1',
      password: 'testuser1',
    }, function(e) {
      if (e.success)   {

        Cloud.Objects.create({
          classname : 'books',
          fields : {
            book_id : 3,
            title : 'PHP',
            author : 'John'
          }
        }, function(e) {
          if(e.success) {
            alert("created");
          } else {
            alert('Create Error:' + ((e.error && e.message) || JSON.stringify(e)));
          }
        }); 
                    
      } else {
        alert('Login Error:' +
                ((e.error && e.message) || JSON.stringify(e)));
      } 
    }); 
}); 

var scrollView = Titanium.UI.createScrollView({ 
	backgroundColor:'#fff',
	contentWidth:300, 
	contentHeight:"auto", 
	showVerticalScrollIndicator:true, 
	showHorizontalScrollIndicator:true,
	borderRadius:5,
	borderWidth:1,
	borderColor:'#999',
	top:145, 
	left:10,
	right:10,
	bottom:10 
});
win.add(scrollView);

var opLabel = Ti.UI.createLabel({
    backgroundColor:'#fff',
    left:5,
    top:5,
    right:5,
    font:{fontSize:15},
    color:'#000'
})
scrollView.add(opLabel); 


  // Create a Button.
var Query = Ti.UI.createButton({
    title : 'Submit Query',
    height : 35,
    width : 130,
    top : 100,
    left:20
});
win.add(Query);
   
   
var dialog = Titanium.UI.createOptionDialog({
	title: 'Query Options',
    options: ["All","WHERE author = 'Peter'", "WHERE book_id > 2", "Cancel" ],
	cancel:3
});

 dialog.addEventListener('click', function(e) {
 	if(e.index == 0){
 		var params = {classname: "books",page: 1,per_page: 10};
 	}else if(e.index == 1){
 		var params = {classname: "books",page: 1,per_page: 10, where: { author: "Peter"}};
 	}else if(e.index == 2){
 		var params = {classname: "books",page: 1,per_page: 10, where: { "book_id":{"$gte" : 2}}};
 	}
 	
   	displayResult(params)
  	
 });
  // Listen for click events.

 Query.addEventListener('click', function(e){
 	dialog.show();
 });
  
  
  function displayResult(params){
    Cloud.Objects.query(
     params
    , function(e) {
      if (e.success) {
                opLabel.text = JSON.stringify(e.books);
      } else {
                alert('Error: ' +((e.error && e.message) || JSON.stringify(e)));        
      } 
    })
 
  }

win.open();

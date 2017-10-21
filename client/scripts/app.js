class CBox {
  init() {
    this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
    this.roomList = [];
    this.fetchData = [];
    this.friendsList = {};
  }
  send (message) {
    $.ajax({
      type: 'POST',
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
      data: message
    });
  }
  fetch () {
    $.ajax({
      type: 'GET',
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
      contentType: 'application/json',
      success: function(res) {
        console.log('SUCCESS');
        
        res.results.forEach(e => app.renderMessage(e));
        
        console.log(res.results);
      },
      error: function(error) {
        console.log('SOMETHING WENT WRONG!\n', error);
      }
    });
  }
  clearMessages () {
    $('#chats').html('');
  }
  renderMessage (message) {
    //this.send(message);
    
    $('<p class=".message"><strong><button class="username">' + message.username + '</button></strong>: ' 
      + message.text + '</p><hr>').appendTo('#chats');
  }
  renderRoom (roomName) {
    this.roomList.push(roomName);
    $('<h2>' + roomName + '</h2>').appendTo('#roomSelect');
  }
  handleUsernameClick (userName) {
    this.addFriend(userName);
    alert('User name ' + userName + ' will be added to your friends list');
  }
  handleSubmit (message) {
    // var $inputs = $('#send :input');
    this.renderMessage(message);
    //alert('You tried to submit something');
    // alert($inputs);
  }
  addFriend (name) {
    this.friendsList[name] = name;
  }
}

var app = new CBox;

$(document).ready(function() {
  
  app.fetch();
  //handle username click will add the clicked name as a friend.
  $('#main').find('.username').on('click', function() {
    var $name = $('input[name="username"]').val();
    app.handleUsernameClick({text: $name});
  });
  //submit will post the POST the message and append to the DOM
  $(document).on('submit', '#send', function(e) {
    var $message = $('input[name="message"]').val();
    
    app.handleSubmit({text: $message});
    
    e.preventDefault();
  });
  
});









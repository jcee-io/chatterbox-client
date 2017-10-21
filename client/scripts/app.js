class CBox {
  init() {
    this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
    this.roomList = [];
    this.friendsList = {};
  }
  send (message) {
    $.ajax({
      type: 'POST',
      url: this.server,
      data: message
    });
  }
  fetch () {
    $.ajax({
      type: 'GET',
      url: this.server,
      success: function(res) {
        console.log(res);
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
    this.send(message);
    
    $('<p>' + message.text + '</p>').appendTo('#chats');
  }
  renderRoom (roomName) {
    this.roomList.push(roomName);
    $('<h2>' + roomName + '</h2>').appendTo('#roomSelect');
  }
  handleUsernameClick (userName) {
    this.addFriend(userName);
    alert('this is the usernameclick');
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
  //renderRoom will create a chat room
  
});









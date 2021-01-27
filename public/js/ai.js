var element = $(".floating-chat");
var myStorage = localStorage;

if (!myStorage.getItem("chatID")) {
  myStorage.setItem("chatID", createUUID());
}

setTimeout(function () {
  element.addClass("enter");
}, 1000);

element.click(openElement);

function openElement() {
  var messages = element.find(".messages");
  var textInput = element.find(".text-box");
  element.find(">i").hide();
  element.addClass("expand");
  element.find(".chat").addClass("enter");
  var strLength = textInput.val().length * 2;
  textInput.keydown(onMetaAndEnter).prop("disabled", false).focus();
  element.off("click", openElement);
  element.find(".header button").click(closeElement);
  element.find("#sendMessage").click(sendNewMessage);
  messages.scrollTop(messages.prop("scrollHeight"));
}

function closeElement() {
  element.find(".chat").removeClass("enter").hide();
  element.find(">i").show();
  element.removeClass("expand");
  element.find(".header button").off("click", closeElement);
  element.find("#sendMessage").off("click", sendNewMessage);
  element
    .find(".text-box")
    .off("keydown", onMetaAndEnter)
    .prop("disabled", true)
    .blur();
  setTimeout(function () {
    element.find(".chat").removeClass("enter").show();
    element.click(openElement);
  }, 500);
}

function createUUID() {
  // http://www.ietf.org/rfc/rfc4122.txt
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}
const trigger = [
  //0
  ["hi", "hey", "hello"],
  //1
  ["how are you", "how are things"],
  //2
  ["what is going on", "what is up"],
  //3
  ["happy", "good", "well", "fantastic", "cool"],
  //4
  ["bad", "bored", "tired", "sad"],
  //6
  ["thanks", "thank you"],
  //7
  ["bye", "good bye", "goodbye"],
  ["1"],
  ["2"],
  ["3"],
  ["4"],
  ["5"]  
];

const reply = [
  //0
  ["Hello!", "Hi!", "Hey!", "Hi there!"],
  //1
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?",
  ],
  //2
  ["Nothing much", "Exciting things!"],
  //3
  ["Glad to hear it"],
  //4
  ["Sorry to hear that?", "Cheer up buddy"],
  //5
  ["You're Welcome", "Thank my creators!"],
  //7
  ["Goodbye", "See you later"],
  ["1"],
  ["2"],
  ["3"],
  ["4"],
  ["5"] 
 
];

const alternative = [
  "Invalid Input Given",
  "That's not what you typed",
  "I am not AI",
  "That's rude now",
];
function sendNewMessage() {
  var userInput = $(".text-box");
  var newMessage = userInput
    .html()
    .replace(/\<div\>|\<br.*?\>/gi, "\n")
    .replace(/\<\/div\>/g, "")
    .trim()
    .replace(/\n/g, "<br>");

  if (!newMessage) return;

  var messagesContainer = $(".messages");

  messagesContainer.append(['<li class="self">', newMessage, "</li>"].join(""));
  let product;
  if (compare(trigger, reply, newMessage.toLowerCase())) {
    product = compare(trigger, reply, newMessage.toLowerCase());
  } else if (newMessage.toLowerCase().match(/robot/gi)) {
    product = robot[Math.floor(Math.random() * robot.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  messagesContainer.append(['<li class="other">', product, "</li>"].join(""));

  // clean out old message
  userInput.html("");
  // focus on input
  userInput.focus();

  messagesContainer.finish().animate(
    {
      scrollTop: messagesContainer.prop("scrollHeight"),
    },
    250
  );
}

function compare(triggerArray, replyArray, text) {
  let item;


  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < replyArray.length; y++) {
      if (triggerArray[x][y] == text) {
        items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }
  return item;
}
function onMetaAndEnter(event) {
  if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
    sendNewMessage();
  }
}

console.log("i am here ");


const socket = io();

const{username , room } = Qs.parse(location.search,{
    ignoreQueryPrefix : true,
})

var audio = new Audio('../css/msgtune.mp3');

socket.emit('joinRoom',username,room);
socket.on('roomusers',({room , users},msg)=>{
    console.log(":here is prob");
OutputRoomName(room);
OutputUserName(users);
console.log(msg);
})

socket.on('endmessage',(msg)=>{
jointwo(msg,'left','ChatBot');
})

socket.on('user-joined',(name)=>{
jointwo(`${name} has joined the chat`,'left','ChatBot');


})

socket.on('message',(message,username)=>{
    jointwo(message , 'left',username);
})



const form = document.getElementById('chat-form');
const msgcontainer = document.querySelector('.chat-messages');

form.addEventListener('submit',(e)=>{
e.preventDefault();
let msg = document.getElementById('msg').value;

socket.emit('sendmsg',msg,username);
jointwo(msg,'right','You');
document.getElementById('msg').value = " ";
//scroll function

msgcontainer.scrollTop = msgcontainer.scrollHeight;

})



const jointwo = (message , position,user)=>{
const msgdiv = document.createElement('div');
msgdiv.classList.add('card','card-body');
msgdiv.classList.add(position);
const para = document.createElement('p');
const text = document.createTextNode(message);
para.appendChild(text);
const head = document.createElement('h4');
const text2 = document.createTextNode(user);
head.appendChild(text2);
msgdiv.append(head,para);
msgcontainer.append(msgdiv);

//audio
if(position=='left'){
    audio.play();
}

}

const roomname = document.getElementById('room-name');
const user = document.getElementById('users');
const OutputRoomName = (room)=>{
roomname.innerText = room;
}

const OutputUserName = (users)=>{
user.innerHTML = `
${users.map(user => `<li> ${ user.name}  </li>`).join(' ')}
`
console.log("helo world");
}

const users = [];

function getUsers(id,name,room){
const user ={id :id, name :name, room :room};
users.push(user);

return user;

}

function getCurrentUser(id){
return  users.find(user => user.id == id);

}

function leaveUser(id){
const index = users.findIndex(user => user.id == id);

    console.log(" i am splicing it bro");
     users.splice(index,1);
     return users;

}

function getAllUsers(room){
    return users.filter(user => user.room == room);
}




module.exports.getUsers=getUsers;
module.exports.getCurrentUser=getCurrentUser;
module.exports.getAllUsers=getAllUsers;
module.exports.leaveUser=leaveUser;
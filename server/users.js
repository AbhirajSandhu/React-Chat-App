const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase(); // trim helps in removing blank spaces
    room = room.trim().toLowerCase();

    // check if there is an existing user if trying to login
    const existingUser = user.find((user) => user.room === room && user.name === name);

    if(existingUser) {
        return { error : 'Username is taken' };
    }

    const user = { id, name, room };
    users.push(user);
}

const removeUser = () => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = ( id ) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
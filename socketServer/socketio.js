const { DatewiseBookingSummaryByPeriod, filterBookingWithfromToDateAndKeyWord } = require("../businessUnitAdministration/services/appoinment.service");

let users = [];

const socketHandler = (io) => {
    const addUser = (userId, socketId) => {
        const existingUser = users.find((user) => user.userId === userId);
        if (existingUser) {
            existingUser.socketId = socketId;
            existingUser.online = true;
            // console.log(`User ${userId} reconnected with socketId ${socketId}`);
        } else {
            if (userId) {
                users.push({ userId, socketId, online: true });
                // console.log(users, 'Online users after adding:');
            }
        }
        // console.log(users,'usersOnline')
        io.emit("usersOnline", users);
    };

    const removeUser = (socketId) => {
        users = users.map(user => 
            user.socketId === socketId ? { ...user, online: false } : user
        );
        io.emit("usersOnline", users); // Update other clients
        // console.log(`User with socketId ${socketId} has been marked as offline.`);
    };

    io.on('connection', (socket) => {
        // console.log(users, 'A user connected: ', socket.id);
        
        // Notify user on connection
        io.to(socket.id).emit('notification', {
            message: `Welcome, user!`
        });

        socket.on('join', ({ userId }) => {
            // console.log(`User ${userId} has joined with socket id: ${socket.id}`);
            io.to(socket.id).emit('notification', {
                message: `Welcome, user ${userId}!`
            });
        });

        socket.on("addUser", (user) => {
            // console.log('AddUser event received:', user);
            addUser(user.userId, socket.id);  
        });

        socket.on("sentNotification", async (message) => {
            // console.log('sentNotification event received:', message);
            const receiver = users.find(user => user.userId === message.receiverId);
            const socketId = receiver?.socketId;
            
            if (socketId) {
                io.to(socketId).emit('receiveNotification', message);
                const result  = await filterBookingWithfromToDateAndKeyWord ({clientId:clientId,branchId:branchId,fromDate:new Date()?.toISOString()?.split('T')[0] , toDate:new Date()?.toISOString()?.split('T')[0]  })
                // console.log(`Sent waiting list for branch ${branchId} to ${userId}`);
                
                io.emit('currentWaitingList',{result})
                // console.log(`Notification sent to ${message.receiverId}`);
            } else {
                // console.warn(`Receiver with userId ${message.receiverId} not connected`);
            }
        });

        socket.on("getBranchWaitingList", async (message) => {
            const { userId, branchId,clientId } = message
            // console.log('getBranchWaitingList received:', message);
            // socket.emit("currentWaitingList", { userId, branchId });
            const result  = await filterBookingWithfromToDateAndKeyWord ({clientId:clientId,branchId:branchId,fromDate:new Date()?.toISOString()?.split('T')[0] , toDate:new Date()?.toISOString()?.split('T')[0]  })
            // console.log(`Sent waiting list for branch ${branchId} to ${userId}`);
           
            io.emit('currentWaitingList',{result})
        });
        
        socket.on('message', (data) => {
            // console.log('Received message: ', data);
            io.emit('message', data);  // Consider changing this to send to specific users if needed
        });

        socket.on('disconnect', () => {
            // console.log('User disconnected: ', socket.id);
            removeUser(socket.id);  
        });
    });
};

module.exports = socketHandler;

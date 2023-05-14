import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userList: [
        { id: '001', name: 'Nguyễn Văn A', phone: '0996548912', email: 'nguyenvana@gmail.com' },
        { id: '002', name: 'Trần Hoàng Long', phone: '0996548923', email: 'tranghoanglong@gmail.com' },
        { id: '003', name: 'Lê Thị Hồng', phone: '0996548934', email: 'lethihong@gmail.com' },
    ],
    editUser: {}
};

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        addUser: (state, { payload }) => {
            state.userList.push(payload);
        },
        removeUser: (state, { payload }) => {
            let index = state.userList.findIndex(user => user.id === payload);
            if (index !== -1) {
                state.userList.splice(index, 1);
            }
        },
        setEditUser: (state, { payload }) => {
            let user = state.userList.find(user => user.id === payload);
            if (user) {
                state.editUser = user;
            } else {
                state.editUser = {};
            }
        },
        updateUser: (state, { payload }) => {
            let index = state.userList.findIndex(user => user.id === payload.id);
            if (index !== -1) {
                state.userList[index] = payload;
            }
        }
    }
});

export const {
    addUser,
    removeUser,
    setEditUser,
    updateUser
} = userReducer.actions;

export default userReducer.reducer;
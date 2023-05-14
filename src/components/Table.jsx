import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeUser, setEditUser } from '../redux/reducers/userReducer';
import { toSlug } from '../utils/toSlug';

export default function Table() {
  const dispatch = useDispatch();
  const { userList, isDisabled } = useSelector((state) => state.userReducer);
  const [tableList, setTableList] = useState(userList);

  useEffect(() => {
    setTableList(userList);
  }, [userList]);

  const handleSearch = (e) => {
    const searchList = userList.filter((user) => toSlug(user.name).includes(toSlug(e.target.value)));
    setTableList(searchList);
  };

  const handleUpdateUser = (id) => {
    dispatch(setEditUser(id));
  };

  const handleRemoveUser = (id) => {
    dispatch(removeUser(id));
  };

  const renderUserList = (list) => {
    if (Array.isArray(list)) {
      return list.map((user, index) => (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.phone}</td>
          <td>{user.email}</td>
          <td>
            <button className='btn btn-success me-3' onClick={() => handleUpdateUser(user.id)}>
              Chỉnh sửa
            </button>
            <button className='btn btn-danger' onClick={() => handleRemoveUser(user.id)} disabled={isDisabled}>
              Xóa
            </button>
          </td>
        </tr>
      ));
    }
  };

  return (
    <div className='container mt-3'>
      <h3 className='bg-dark text-white p-3'>Danh sách sinh viên</h3>

      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Tìm kiếm theo họ tên
        </label>
        <input
          type='text'
          className='form-control'
          id='email'
          name='email'
          onInput={handleSearch}
          disabled={isDisabled}
        />
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>{renderUserList(tableList)}</tbody>
      </table>
    </div>
  );
}

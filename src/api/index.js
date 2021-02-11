import ajax from './ajax';

export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST');
export const reqAddUser = (user) => ajax('/manage/user/add', { user }, 'POST');
export const reqUpdateUser = (_id) => ajax('/manage/user/update', { _id }, 'POST');
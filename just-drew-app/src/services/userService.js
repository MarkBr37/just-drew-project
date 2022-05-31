export const login = ({ id, name, email, date }) => {
   const user = { "id": id, "name": name, "email": email, "date": date };
   const jsonUser = JSON.stringify(user);
   localStorage.setItem('jd', jsonUser);
   window.location = '/';
}

export const logout = () => {
   localStorage.removeItem('jd');
   window.location = '/signin';
   return null;
}

const userService = { login, logout }
export default userService;
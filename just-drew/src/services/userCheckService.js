import http from './httpService'
import { apiUrl } from '../config.json';

import { logout } from './userService';

// get user from localStorage
export const getUser = () => {
   let user = localStorage.getItem('jd');
   if (!user) return null;
   user = JSON.parse(user);
   if (user.id && user.email && user.name && user.date) {
      const objUser = {
         id: user['id'],
         email: user['email'],
         name: user['name'],
         date: user['date'],
      };
      return objUser;
   }

   return null;
}

// send the data user to server to check if exist
export const checkAndGetUser = async () => {
   const user = getUser();

   if (!user) {
      localStorage.removeItem('jd');
      return null;
   }

   try {

      const form = new FormData();
      for (const pro in user) form.append(pro, user[pro]);

      const res = await http.post(apiUrl + 'check_user.php', form)
      // the server will response in 1 or 0
      if (res.data) { // the user is exists
         return user;
      } else { // the user is does not exists
         return logout();
      }

   } catch {
      return logout();
   }

}


const userCheckService = { checkAndGetUser, getUser }
export default userCheckService;
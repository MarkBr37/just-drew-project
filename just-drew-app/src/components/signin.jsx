import React from 'react';
import Form from './common/form';
import PageTitle from './common/page_title';
import Joi from 'joi';
import http from '../services/httpService';
import { apiUrl } from '../config.json';
import { login } from '../services/userService';

class Signin extends Form {
   state = { 
      data:{ email: "", password: ""},
      errors: {}
   }
   
   schema = {
      email: Joi.string().required().email({ tlds: {allow: false} }),
      password: Joi.string().required().min(6).max(20),
   }
   
   doSubmit = async (submit) => {
      const data = { ...this.state.data };
      const form = new FormData();

      for(const pro in data) form.append(pro ,data[pro]);
      form.append(submit,'')

      try {
         const res = await http.post(apiUrl+"signin_user.php", form)
         
         if( res.data.error && res.data.error === 'true'){
            this.serverResError(res.data)

         }else{ 
            login(res.data);
         }

      }catch(ex){
         if(ex.respones && ex.response.status === 401){

            alert('Please try again');
            window.location.reload();
         }else{
            alert('The server is busy, Please try again leter');
         }
      }

      
   }
   

   render() { 
      const error = this.state.errors
      
      return (
            <div className="container">
               <PageTitle title='Signin Page'/>
               <div className="row">
                  <div className="col-lg-6 mt-3">
                     <form onSubmit={this.handleSubmit} method="POST" autoCapitalize="off" autoComplete='off'>
                        <div className="form-group">
                           <label htmlFor="email">Email:</label>
                           <input type="email" className="form-control" id="email" name="email" onChange={this.handleChange}/>
                           {error['email'] && <span className="text-danger">{error['email']}</span>}
                        </div>
                        
                        <div className="form-group">
                           <label htmlFor="password">Password:</label>
                           <input type="password" className="form-control" id="password" name="password" onChange={this.handleChange}/>
                           {error['password'] && <span className="text-danger">{error['password']}</span>}
                        </div>
                        <button type="submit" name="submit" className="btn btn-primary mt-2" disabled={this.validate()} >Submit</button>
                     </form>
                  </div>
               </div>
            </div>
      );
   }
}
 
export default Signin;
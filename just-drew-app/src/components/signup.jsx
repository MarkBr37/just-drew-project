import React from 'react';
import Form from './common/form';
import PageTitle from './common/page_title';
import Joi from 'joi';
import http from '../services/httpService';
import { inArray } from '../services/utils';
import { apiUrl } from '../config.json';

class Signup extends Form {

   state = { 
      data:{ email: "", password: "", name:"" ,},
      selectImage: null,
      errors: {},
      imageErrors: {},
   }

   // for thie handleImage
   MEGABYTE = 5;

   schema = {
      email: Joi.string().required().email({ tlds: {allow: false} }),
      password: Joi.string().required().min(6).max(20),
      name: Joi.string().required().min(3).max(70)
   }
   
   
   handleImage = (e) => {

      let file = e.target.files[0];
      const imageErrors = {} 
      const maxSize = 1024 * 1024 * this.MEGABYTE;
      const re = /\.(png|jpeg|jpg|gif|bmp)$/
      let imageValid = true;

      // validate image 
      if(file && file.size > maxSize){
         imageErrors['imageSize'] = 'image heve to be less then '+this.MEGABYTE+'MB';
         imageValid = false;
      }else delete imageErrors['imageSize'];

      if(file && !re.test(file.name.toLowerCase())){
         imageErrors['imagefile'] = 'image heve to be: png, jpeg, jpg, gif, bmp';
         imageValid = false;
      }else delete imageErrors['imagefile'];

      if( imageValid ){
         // file = URL.createObjectURL(file); to show the image
         this.setState({selectImage: file,imageErrors});
      }else{
         e.currentTarget.value = ''
         this.setState({selectImage:'',imageErrors});
      }
   }

   

   doSubmit = async (submit) => { 
      const data = { ...this.state.data };
      const { selectImage } = this.state;

      const form = new FormData();
      for (const pro in data) form.append(pro ,data[pro]);
      form.append('image', selectImage);
      form.append(submit,'');
      
      try {
         const res = await http.post(apiUrl+"signup_user.php", form);
         
         if( res.data.error && res.data.error === 'true'){
            this.serverResError(res.data)
         }else{

            alert("Your signup successfuly")
            this.props.history.replace('/signin');

         }
       } catch(ex){
          // expected errors
          const ee = [401,404];
          if(ex.response && inArray(ee, ex.response.status) ){
            alert('Please try again');
            window.location.reload();
         }else{   
           alert('The server is busy, Please try again leter');
         }
         
      } 
   }

   render() { 
   
      const error = this.state.errors;
      const imageErrors = this.state.imageErrors;
      return (
            <div className="container">
               <PageTitle title='Signup Page'/>
               <div className="row">
                  <div className="col-lg-6 mt-3">
                     <form onSubmit={this.handleSubmit} method="POST" autoCapitalize="off" autoComplete='off'>

                        <div className="form-group">
                           <label htmlFor="name"><span className='text-danger'>*</span>Name:</label>
                           <input type="text" className="form-control" id="name" name="name" onChange={this.handleChange}/>
                           {error['name'] && <span className="text-danger">{error['name']}</span>}
                        </div>

                        <div className="form-group">
                           <label htmlFor="email"><span className='text-danger'>*</span>Email:</label>
                           <input type="email" className="form-control" id="email" name="email" onChange={this.handleChange}/>
                           {error['email'] && <span className="text-danger">{error['email']}</span>}
                        </div>

                        <div className="form-group">
                           <label htmlFor="password"><span className='text-danger'>*</span>Password:</label>
                           <input type="password" className="form-control" id="password" name="password" onChange={this.handleChange}/>
                           {error['password'] && <span className="text-danger">{error['password']}</span>}
                        </div>
                        
                        <div className="form-group">
                           <label htmlFor="Image">Profile Image:</label>
                           <input type="file" className="form-control-file" id="Image" name="image" onChange={this.handleImage}/>
                           {!imageErrors['imagefile'] && !imageErrors['imageSize'] && <span className='info'>image have to be: png / jpeg / jpg / gif / bmp</span>}
                           {!imageErrors['imagefile'] && !imageErrors['imageSize'] && <br/>}
                           {!imageErrors['imagefile'] && !imageErrors['imageSize'] && <span className='info'>image have to be max {this.MEGABYTE}MB</span>}

                           {imageErrors['imageSize'] && <span className="text-danger">{imageErrors['imageSize']}</span>}
                           {imageErrors['imagefile'] && imageErrors['imageSize'] && <br/>}
                           {imageErrors['imagefile'] && <span className="text-danger">{imageErrors['imagefile']}</span>}
                        </div>

                        <button type="submit" name="submit" className="btn btn-primary mt-2" disabled={this.validate()} >Submit</button>
                     </form>
                  </div>
               </div>
            </div>
      );
   }
}
 
export default Signup;
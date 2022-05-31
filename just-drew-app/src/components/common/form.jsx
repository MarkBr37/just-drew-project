import { Component } from 'react';
import Joi from 'joi';

class Form extends Component {
   state = { 
      data: {},
      errors: {}
   };

   validate = () => {
      const options = {abortEarly:false};
      const { error } = Joi.object(this.schema).validate(this.state.data, options );
      
      if( !error ) return null;

      const errors = {};
      for(let details of error.details) errors[details.path[0]] = details.message;
      
      return errors;
   }
   
   validateProperty = ({name, value}) => {
      if(!name) return null
      if(!this.schema[name]) return null;

      const obj = { [name]: value };
      const schema = { [name]: this.schema[name]}
      const { error } = Joi.object(schema).validate(obj)

      return error ? error.details[0].message : null;
   }

   handleChange = ({currentTarget: input}) => {
      const {data , errors} = this.state;
      const errorMessage = this.validateProperty(input);

      if(errorMessage) errors[input.name] = errorMessage
      else delete errors[input.name];
      
      data[input.name] = input.value;

      this.setState({data, errors});
   }
   
   handleSubmit = (e) => {
      e.preventDefault();
      const errors = this.validate();
      this.setState({errors: errors != null ? errors : {}})

      if ( errors ) return;
      // the 'e.target[3].name' is for the server 
      this.doSubmit(e.target['submit'].name);
   }

   // if the sever return error serverResError wil updata this.state
   serverResError = ({error,...errors}) =>{
      
      if( errors.image ){
         const imageErrors = {'imageSize': errors.image}
         delete errors.image
         this.setState({errors,imageErrors})
      }else{
         this.setState({errors})
      }
   }

}
 
export default Form;
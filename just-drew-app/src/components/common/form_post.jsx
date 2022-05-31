import { Component } from 'react';

class FormPost extends Component {
   state = { 
      post_article: '',
      errors: {}
   };

   validatePost = () => {
      const { post_article, selectImage ,oldArticle } = this.state;
      const errors = {}

      // for validate in edit_post
      if(oldArticle && oldArticle === post_article && !selectImage){
         errors['post'] = "You didn't change your post :/ ?";
         return errors;
      }

      if( !post_article && !selectImage ) 
      {
         errors['post'] = 'Text or image are not allow to be empty.';
         return errors;
      };
      return '';
   }

   handleChange = ({currentTarget: textarea}) => {
      const post_article = textarea.value;
      this.setState({ post_article });
   }

   handleSubmit = (e) => {
      e.preventDefault();
      const errors = this.validatePost();
      this.setState({errors: errors !== '' ? errors : {}})

      if (errors) return;
      this.doSubmit();
   }

   handleImage = (e) => {

      let file = e.target.files[0];
      const imageErrors = {};
      const maxSize = this.maxSizeImage;
      const re = /\.(png|jpeg|jpg|gif|bmp)$/;
      let imageValid = true;

      // validate image 
      if(file && file.size > maxSize){
         imageErrors['imageSize'] = 'image heve to be less then '+ this.MEGABYTE +'mb';
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
 
export default FormPost;
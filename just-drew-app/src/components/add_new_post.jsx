import React from 'react';
import FormPost from './common/form_post';
import PageTitle from './common/page_title';
import http from '../services/httpService';

import { getUser } from '../services/userCheckService';
import { apiUrl } from '../config.json';
import { inArray } from '../services/utils';

class AddNewPost extends FormPost {

   state = {
      post_article: '',
      selectImage: null,
      errors: {},
      imageErrors: {},
   }

   // this is for handleImage
   // and for info and error
   MEGABYTE = 5;
   maxSizeImage = 1024 * 1024 * this.MEGABYTE;

   doSubmit = async () => {
      const { post_article, selectImage } = this.state;
      const user_info = getUser();

      const data = {
         textarea_post: post_article,
         select_image: selectImage,
         user_id: user_info['id'],
         user_date: user_info['date'],
      }


      const form = new FormData();
      for (const pro in data) form.append(pro, data[pro])

      try {
         const res = await http.post(apiUrl + 'add_post.php', form);

         if (res.data.error && res.data.error === 'true') {
            this.serverResError(res.data)
         } else {
            this.props.history.replace('/my-post');
         }

      } catch (ex) {
         // expected errors
         const ee = [401, 404];
         if (ex.response && inArray(ee, ex.response.status)) {
            alert('Please try again');
            window.location.reload();
         }
      }
   }

   render() {
      const error = this.state.errors;
      const imageErrors = this.state.imageErrors;
      return (
         <div className="container">
            <PageTitle title='Create new post' />
            <div className="row">
               <div className="col-lg-6 mt-3">
                  <form onSubmit={this.handleSubmit} method="POST" autoCapitalize="off" autoComplete='off'>

                     <div className="form-group">
                        <label htmlFor="post_article">Text:</label>
                        <textarea type="text" className="form-control" rows='4' id="post_article" name="post_article" onChange={this.handleChange}></textarea>
                     </div>

                     <div className="form-group">
                        <label htmlFor="Image">Choose your Image:</label>
                        <input type="file" className="form-control-file" id="Image" name="image" onChange={this.handleImage} />

                        {/* info text */}
                        {!imageErrors['imagefile'] && !imageErrors['imageSize'] && <span className='info'>image have to be: png / jpeg / jpg / gif / bmp</span>}
                        {!imageErrors['imagefile'] && !imageErrors['imageSize'] && <br />}
                        {!imageErrors['imagefile'] && !imageErrors['imageSize'] && <span className='info'>image have to be max {this.MEGABYTE}MB</span>}

                        {/* error text */}
                        {imageErrors['imageSize'] && <span className="text-danger">{imageErrors['imageSize']}</span>}
                        {imageErrors['imagefile'] && imageErrors['imageSize'] && <br />}
                        {imageErrors['imagefile'] && <span className="text-danger">{imageErrors['imagefile']}</span>}
                     </div>
                     <div className="form-group">

                        {error['post'] && <span className="text-danger">{error['post']}</span>}
                     </div>
                     <button type="submit" name="submit" className="btn btn-primary mt-2" disabled={this.validatePost()} >Create</button>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}

export default AddNewPost;
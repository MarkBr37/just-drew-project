import React from 'react';
import PageTitle from './common/page_title';

const About = () => {
   
   return ( 
      
      <React.Fragment>
         <div className="container">
            < PageTitle title='About us'/>
            <div className="row">
               <div className="col-10">
                  <p className="lead mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quibusdam earum minima quos molestias nobis sint cupiditate aliquam quisquam? Animi reprehenderit ipsum inventore voluptatem commodi adipisci explicabo modi repudiandae pariatur?</p>
                  <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quibusdam earum minima quos molestias nobis sint cupiditate aliquam quisquam? Animi reprehenderit ipsum inventore voluptatem commodi adipisci explicabo modi repudiandae pariatur?</p>
               </div>
            </div>
         </div>
      </React.Fragment>
   );
}
 
export default About;
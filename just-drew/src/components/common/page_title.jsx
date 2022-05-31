import React from 'react';

const PageTitle = (props) => {
   return ( 
      <div className="row">
         <div className="col-12 mt-4">
            <h1 className="display-4">{props.title}</h1>
            {props.text && <p className="lead">{props.text}</p>}
         </div>
      </div>
    );
}
 
export default PageTitle;
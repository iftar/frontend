import React, {Fragment} from 'react';

function Card(props) {
  const title = props.title;
  return (
      <Fragment>
        <div className="card card-signin my-5">
          <div className="card-body">
            {props.children}
          </div>
        </div>
      </Fragment>
  )
}

export default Card;
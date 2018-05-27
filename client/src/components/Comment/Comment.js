import React from 'react';

import './Comment.css'

const Comment = props => {
    return (
        <div className="col-lg-12 comment">
            <div>
                <div className="user">
                    <img src="/images/user-icon.png" alt=""/>
                    <div>
                        <p className="user-name">{props.userName}</p>
                        <p className="data">{props.timestamp}</p>
                    </div>
                </div>
                <div className="content">
                    <div>
                        {props.content}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Comment;
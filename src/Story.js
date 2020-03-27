import React, {Component} from 'react';
import moment from 'moment';
import './story.css';

class Story extends Component {
  state = {  }
  render() { 
    const {story} = this.props
    return ( 
      <div className='story'>
        <p><a href={story.url} target='_blank' rel='noopener noreferrer'>{story.title}</a></p>
        <p>By: {story.author} | {moment(story.created_at).fromNow()}</p>
      </div>

    );
  }
}

export default Story;
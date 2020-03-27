import React, {Component} from 'react';
import moment from 'moment';
import './story.css';

class Story extends Component {
  state = { url: undefined }
  componentDidMount(){
    fetch('https://source.unsplash.com/random')
      .then(res => {
        console.log(res)
        this.setState({url: res.url})})
  }
  render() { 
    const {story} = this.props
    return ( 
      <div className='story'>
        <div className='img-container'>
          <img src={this.state.url} className='story-img' alt=''></img>
        </div>
        <h1><a href={story.url} target='_blank' rel='noopener noreferrer'>{story.title}</a></h1>
        <p>By: {story.author} | {moment(story.created_at).fromNow()}</p>
      </div>

    );
  }
}

export default Story;
import React, {Component} from 'react';
import moment from 'moment';
import './story.css';

class Story extends Component {
  state = { 
    url: undefined,
    randomUrls: [

    ]
  }
  componentDidMount(){
    // fetch(`https://api.unsplash.com/photos/random/?client_id=I0xGcimco-2dGPdxoNOFryg7kR0POqneNyXiwhbUgKM&count=1&orientation=portrait`)
    // .then(res => res.json())
    // .then(json => this.setState({url: json[0].urls.small}))
    // fetch('https://source.unsplash.com/random/200x180')
    //   .then(res => {
    //     console.log(res)
    //     this.setState({url: res.url})})
  }
  render() { 
    const {story, url, animationDelay} = this.props
    return ( 
      <a href={story.url} target='_blank' rel='noopener noreferrer'>
        <div className={`story animated fadeIn delay-${animationDelay}`}>
          <div className='img-container'>
            <img src={url} className='story-img' alt=''></img>
          </div>
          <div className='info-container'>
            <h1>{story.title}</h1>
            <p>By: {story.author} | {moment(story.created_at).fromNow()}</p>
          </div>
        </div>
      </a>

    );
  }
}

export default Story;
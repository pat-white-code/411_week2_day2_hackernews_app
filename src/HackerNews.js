import React, {Component} from 'react';
import Story from './Story';

class HackerNews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      stories : [],
      query: '',
      authorFilter: '',
      sinceTime: '',
      typingTimerInterval: 500,
      now: Math.floor(new Date().valueOf() / 1000),
      //time in api is measured in s, not ms.^^^
      randomPhotos: []
    }
    this.typingTimer = undefined;
  }

  handleChange = e => {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(this.doneTyping, this.state.typingTimerInterval)
    this.setState({ [e.target.name]: e.target.value }); 
  }

  componentDidMount(){
    this.fetchData();
    this.fetchPhotos();
    // this.setState({now: new Date().valueOf()})
  }

  doneTyping = () => {
    this.fetchData();
    this.fetchPhotos();
  }

  fetchPhotos = () => {
    let url = `https://api.unsplash.com/photos/random/?client_id=${process.env.unsplash key}&count=30&orientation=squarish`;
    if(this.state.query) {url = url + `&query=${this.state.query}`} 
    fetch(url)
      .then(res => res.json())
      .then(json => json.map(photo => photo.urls.small))
      .then(photos => this.setState({randomPhotos: photos}))
  }

  fetchData = () => {
    this.setState({isLoading: true})
    // let url =  `http://hn.algolia.com/api/v1/search?query=${this.state.query}&tags=story`
    let url =  `http://hn.algolia.com/api/v1/search?query=${this.state.query}&tags=story`
    if(this.state.authorFilter){
      url = url + `,author_${this.state.authorFilter}`
    }

    if(this.state.sinceTime){
      url=url + `&numericFilters=created_at_i>${this.state.sinceTime}`
    }
    console.log('FETCHING FROM URL', url)
    fetch(url)
      .then(res => res.json())
      .then(json => this.setState({
        stories: json.hits,
        isLoading: false
      }))
  }

  render() { 
    return ( 
      <div>
        <h1>Search HackerNews!</h1>

        <form>
          <input type='input' value={this.state.query} placeholder='search term' onChange={this.handleChange} name='query'></input>
          <input type='input' value={this.state.authorFilter} placeholder='Search By Author' onChange={this.handleChange} name='authorFilter'></input>
          <select type='select' placeholder='Since Time in Seconds' onChange={this.handleChange} name='sinceTime'>
            <option>Search by Time</option>
            <option value={this.state.now - 86400}>Today</option>
            <option value={this.state.now - 604800}>Past Week</option>
            <option value={this.state.now - 2628000}>This Month</option>
            <option value={this.state.now - 2628000*12}>This Year</option>
          </select>
        </form>
        {this.state.isLoading && (
          <div className = 'isloading'></div>
        )}
        <div className='stories'>
        {!this.state.isLoading && (
          this.state.stories.map((story, index) => (
          <Story
            key={index}
            story={story}
            url={this.state.randomPhotos[index]}
            />
          ))
        )}
        </div>
      </div>
    );
  }
}

export default HackerNews;
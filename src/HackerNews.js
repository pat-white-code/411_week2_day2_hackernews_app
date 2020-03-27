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
      typingTimerInterval: 500
    }
    this.typingTimer = undefined;
  }

  handleChange = e => {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(this.doneTyping, this.state.typingTimerInterval)
    this.setState({ [e.target.name]: e.target.value }); 
  }

  componentDidMount(){
    this.fetchData()
  }

  doneTyping = () => {
    this.fetchData();
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
        <input type='input' value={this.state.query} placeholder='search term' onChange={this.handleChange} name='query'></input>
        <input type='input' value={this.state.authorFilter} placeholder='Search By Author' onChange={this.handleChange} name='authorFilter'></input>
        <input type='input' value={this.state.sinceTime} placeholder='Since Time in Seconds' onChange={this.handleChange} name='sinceTime'></input>
        {this.state.isLoading && (
          <div className = 'isloading'></div>
        )}
        {!this.state.isLoading && (
          this.state.stories.map((story, index) => (
          <Story
            key={index}
            story={story} />
          ))
        )}
      </div>
    );
  }
}

export default HackerNews;
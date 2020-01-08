import React, { Component } from 'react';
import Ticker from 'react-ticker'

// Get live financial headlines from News API
class NewsFeed extends Component {
  constructor() {
    super();
    this.state = {
      news: {}
    }
    this.apiDetails = {
      newsAPIKey: '928d65cb179a414e8b48054c1d15e4a5',
      newsType: 'top-headlines',
      category: 'business',
      country: 'us'
    }
  }

  async getHeadline() {
    const api = this.apiDetails
    const url = `https://newsapi.org/v2/${api.newsType}?` + 
                `category=${api.category}&` + 
                `country=${api.country}&` + 
                `apiKey=${api.newsAPIKey}`
    const response = await fetch(url)
    const news = await response.json()

    this.setState({ news: news })
  }

  componentDidMount() {
    this.getHeadline()
  }

  render() {

    if (!Object.entries(this.state.news).length) { return <div>Loading news...</div> }

    return (
      <Ticker>
        {() => (
          <h1 className='wrapping'>
            {this.state.news.articles.map(e => e.title).join(' | ').concat(' | ')}
          </h1>
          )}
      </Ticker>
    )
  }


}

export default NewsFeed;
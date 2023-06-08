import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spiner from './Spiner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "genetral"
  }
  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc78535b3ec64bffabedfaf1730eebf4&page=1&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    this.setState({ loading: true })

    let parsedData = await data.json()
    this.setState({ loading: true })
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
  }

  heandlepre = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc78535b3ec64bffabedfaf1730eebf4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({ articles: parsedData.articles })
    this.setState({ loading: true })

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })

  }

  heandlenex = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc78535b3ec64bffabedfaf1730eebf4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({ articles: parsedData.articles })
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
    }

  }
  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>News App - Top Headlines</h2>
        {this.state.loading && <Spiner />}
        <div className="row" >
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}  >
              < Newsitem title={element.title.slice(0, 45)} discription={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsurl={element.url} />
            </div>
          })}


        </div>

        <div className="container d-flex justify-content-between my-3">
          <button type='button' disabled={this.state.page <= 1} className='btn btn-dark mx-2' onClick={this.heandlepre}> &larr; Previous</button>
          <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-dark mx-2' onClick={this.heandlenex}> Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News

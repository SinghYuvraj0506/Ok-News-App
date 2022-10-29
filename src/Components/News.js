import React, { Component } from "react";
import PropTypes from 'prop-types'
import Newitems from "./Newitems";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps = {
        country:"in",
        pageize:8,
        category:"general"
    }

    static propTypes = {
        country:PropTypes.string,
        pageize:PropTypes.number,
        category:PropTypes.string
    }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalArticles:0
    };
  }

  fetchMoreData = async ()=>{
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({page : this.state.page+1})
    this.setState({ loading:true})
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalArticles: parseddata.totalResults,
      loading:false
    })
  }





  async componentDidMount() {
    this.props.setProgress(0)
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30)
    let parseddata = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parseddata.articles,
      totalArticles: parseddata.totalResults
    })
    this.props.setProgress(100)
  }

    
    render() {

      let capitalize = (word) =>{
        let lower = word.toLowerCase()
        return lower.charAt(0).toUpperCase() + lower.slice(1)
      }     

      let handlePrevClick = async () => {
       let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading:true})
      let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({
      articles: parseddata.articles,
      page: this.state.page - 1,
      loading:false
    })
      };
  
      let handleNextClick = async () => {
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading:true})
      let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({
      articles: parseddata.articles,
      page: this.state.page + 1,
      loading:false
    })
      };
    
    return (
      <>
          <h2 className="text-center my-3">OkNews - Top {capitalize(this.props.category)} Headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state?.articles?.length}
          next={this.fetchMoreData}
          hasMore={this.state?.articles?.length !== this.state.totalArticles}
          loader={<Spinner/>}>
            <div className="container">
          <div className="row my-3">
            {this.state?.articles?.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <Newitems
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={
                      element.urlToImage
                      ? element.urlToImage
                      : "https://pbs.twimg.com/profile_images/943919137579061248/x-6s5MPW_400x400.jpg"
                    }
                    newsUrl={element.url}
                    author = {element.author}
                    date = {element.publishedAt.split('T')[0]}
                    source = {element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
          </InfiniteScroll>
      </>
    );
  }


}
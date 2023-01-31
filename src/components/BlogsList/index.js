import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  constructor(props) {
    super(props)
    this.state = {blogsData: [], isToggle: true}
  }

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const result = await fetch('https://apis.ccbp.in/blogs')
    const data = await result.json()

    const updatedBlogsData = data.map(eachItem => ({
      author: eachItem.author,
      avatarUrl: eachItem.avatar_url,
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      title: eachItem.title,
      topic: eachItem.topic,
    }))
    this.setState({blogsData: updatedBlogsData, isToggle: false})
  }

  render() {
    const {blogsData, isToggle} = this.state
    return (
      <div className="blog-list-container">
        {isToggle ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList

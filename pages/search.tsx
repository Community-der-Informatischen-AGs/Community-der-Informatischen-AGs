import { NextPage } from "next"
import { useRouter } from "next/router"

const Search: NextPage<{ query: any }> = (p: {
  query: any
}) => {
  console.log(p.query)
  return <div></div>
}

Search.getInitialProps = ({ query }) => {
  return { query }
}

export default Search

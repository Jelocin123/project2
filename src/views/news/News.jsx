import { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import { formatDistanceToNow } from 'date-fns'
import { da } from 'date-fns/locale'
import './news.scss'

//import request-hook
import useRequestData from '../../hooks/useRequestData'

const News1 = () => {
  // init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()
  const [searchInput, setSearchInput] = useState("")
  const [category, setCategory] = useState("general")
  const [country, setCountry] = useState("en")
  const [sortby, setSortBy] = useState("publishedAt")

  useEffect(() => {
    handleSubmit()
  }, [category, country, sortby])

  const handleSubmit = (searchValue) => {
    if (searchValue) setCategory(searchValue)
    makeRequest("https://newsapi.org/v2/everything?q=" + category + "&language=" + country + "&sortby=" + sortby +"&apiKey=" + process.env.REACT_APP_NEWSAPIKEY )
  }

  return (
    <div>
      <h1 className='text-center'>News</h1>

      {isLoading && <Loader />}

      {error && <Error />}

      

      <form className='text-center mt-3' onSubmit={e => handleSubmit(e)}>
        <label className='me-4'> kategorier:
          <select className='ms-3' defaultValue={category} onChange={e => setCategory(e.target.value)}>
          <option value="general">General</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </label>

        <label className='ms-4'>Vælg et land:
          <select className='ms-3' defaultValue={country} onChange={e => setCountry(e.target.value)}>
          <option value="">Alle</option>
              <option value="ar">Arabic</option>
              <option value="de">Germany</option>
              <option value="en">Usa</option>
              <option value="es">Spain</option>
              <option value="fr">France</option>
              <option value="he">Hebrew</option>
              <option value="it">Italy</option>
              <option value="nl">Netherlands</option>
              <option value="no">Norway</option>
              <option value="pt">Porugal</option>
              <option value="ru">Russia</option>
              <option value="sv">El Salvador</option>
          </select>
        </label>

        <label className='ms-4'> Sort by:
        <select className='ms-4' defaultValue={sortby} onChange={e => setSortBy(e.target.value)}>
            <option value="publishedAt">Newest</option>
            <option value="relevancy">Relevancy</option>
            <option value="popurlarity">Popurlarity</option>
        </select>
        </label>
      </form>
      <div className='row justify-content-center m-0 mt-3'>
        <input
          className='col-4 p-1'
          type="text"
          value={searchInput}
          placeholder="Indtast søgeord"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(searchInput)
            }
          }}
        />
      </div>

      <div className="row mt-5 p-5 pt-0">
        {data &&
          data.articles.map(n => (
            <div className="col-6 d-flex mt-3">
              <div className="card flex-grow-1">
                {n.urlToImage && <img className="card-img-top" src={n.urlToImage} alt="foto" />}
                <div className="card-body">
                  <h2 className="card-title">{n.title}</h2>
                  <p className="card-text">{n.description} <a href={n.url} target="_blank">Læs mere</a></p>
                  <div className="card-footer">
                    <p className="card-text">{n.author}</p>
                    <div>{new Date(n.publishedAt).toLocaleString("da-dk", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })} <small>{formatDistanceToNow(new Date(n.publishedAt), { locale: da, addSuffix: true, includeSeconds: true })}</small></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default News1;

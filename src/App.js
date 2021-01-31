import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isLoding, setIsLoding] = useState(true)
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [displayData, setDisplayData] = useState([])

  useEffect( ()=>{
    const fetchData = async () => {
      const response = await fetch('https://api.publicapis.org/categories')
      const categories = await response.json()

      setData(categories)
      setDisplayData(categories)
      setIsLoding(false)
    }

    fetchData()
  }, [])

  useEffect(()=>{
    const result = data.filter(value => value.toLowerCase().indexOf(search) > -1)
    setDisplayData(result)
  }, [search, data])

  const onInputChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      { isLoding ? 
        <p>Loading...</p> 
        :
        <>
          <input value={search} onChange={onInputChange} placeholder='search' className='searchBox'/>
          <table>
            <tbody>
              {displayData.map((value,index)=>(
                <tr key={index}><th>{value}</th></tr>
              ))}
            </tbody>
          </table>
        </>
      }
    </div>
  );
}

export default App;

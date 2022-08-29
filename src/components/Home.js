import { useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchCakes } from "../redux/slices/cakesSlice";
import { useSelector, useDispatch } from 'react-redux'
import { ColorRing } from 'react-loader-spinner'

const Home = (props) => {

    const searchForm = document.querySelector('.search-form')
    const [searchValue, setSearchValue] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const [displayCakes, setDisplayCakes] = useState([])
    const [page, setPage] = useState(2)
    const CAKES_IN_LINE = 5

    const dispatch = useDispatch()
    const cakes = useSelector(state => state.cakes)

    useEffect(()=>{
        if (searchForm)
            searchForm.addEventListener('submit', e=>{
                e.preventDefault();
                setSearchValue(searchForm.term.value.trim().toLowerCase())
            })
    }, [searchForm])

    useEffect(() => {
        dispatch(fetchCakes({ limit: CAKES_IN_LINE*2 }))
            .then(data=>setDisplayCakes(data.payload))    
    }, [dispatch])

    useEffect(()=>{
        dispatch(fetchCakes({ limit: CAKES_IN_LINE*2, value: searchValue }))
            .then(data=>setDisplayCakes(data.payload))    
    }, [searchValue])

    const fetchData = () => {
        console.log('reached end of page')
        dispatch(fetchCakes({ page, limit: CAKES_IN_LINE , value: searchValue}))
            .then(data=>{
                if (data.payload.length < CAKES_IN_LINE) setHasMore(false)
                return data.payload
            })
            .then(moreCakes=>setDisplayCakes([...displayCakes, ...moreCakes]))
            .then(()=> setPage(page+1))
    }

    console.log('fetched cakes', cakes)
    console.log('displayCakes', displayCakes)
    console.log('searchValue:', searchValue)
    console.log('page', page)

    return (
        <div className="home">

            <form className="search-form">
                <input type="text" name="term" placeholder="search cakes" />
                {/* <button type="submit" className="search-submit">Search</button> */}
            </form>

            <InfiniteScroll
                dataLength={displayCakes.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
            >
                <ProductPreview products={displayCakes} />
            </InfiniteScroll>

            { cakes.loading &&
                <div style={{display:'flex'}}>
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{margin: 'auto', marginTop: 20}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
            }

            { (!cakes.loading && cakes.error) ? 
                <div>Error: {cakes.error}</div>
                : null
            }
        </div>
    );
}

export default Home;

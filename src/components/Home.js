import { useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchCakes } from "../redux/slices/cakesSlice";
import { useSelector, useDispatch } from 'react-redux'
import Loading from "./Loading";
import Error from "./Error";

const Home = () => {

    const CAKES_IN_LINE = 5
    const LINES_ON_START = 3
    const searchForm = document.querySelector('.search-form')
    const [searchValue, setSearchValue] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const [displayCakes, setDisplayCakes] = useState([])
    const [page, setPage] = useState(LINES_ON_START)
    const dispatch = useDispatch()
    const cakes = useSelector(state => state.cakes)
// console.log(cakes)
    useEffect(()=>{
        if (searchForm)
            searchForm.addEventListener('submit', e=>{
                e.preventDefault();
                setSearchValue(searchForm.term.value.trim().toLowerCase())
            })
    }, [searchForm])

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        
        dispatch(fetchCakes({ limit: CAKES_IN_LINE*LINES_ON_START }, {signal}))
            .then(data=>{
                if(signal.aborted) setDisplayCakes(data.payload)
            })
        return () => controller.abort()
        
    }, [dispatch])

    useEffect(()=>{
        dispatch(fetchCakes({ limit: CAKES_IN_LINE*LINES_ON_START, value: searchValue }))
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

    return (
        <div className="home">

            <form className="search-form">
                <input type="text" name="term" placeholder="search cakes" />
                {/* <button type="submit" className="search-submit">Search</button> */}
            </form>

            <Loading isLoading={cakes.loading} />
            <Error isError={(!cakes.loading && cakes.error)} errorMessage={cakes.error}/>

            { displayCakes && 
                <InfiniteScroll
                    dataLength={displayCakes.length} //This is important field to render the next data
                    next={fetchData}
                    hasMore={hasMore}
                >
                    <ProductPreview products={displayCakes} />
                </InfiniteScroll>
            }

        </div>
    );
}

export default Home;

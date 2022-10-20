import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchCakes, deleteCakes, CAKES_IN_LINE, LINES_ON_START, previousSearch } from "../redux/slices/cakesSlice"
import { useSelector, useDispatch } from 'react-redux'
import Loading from "../components/Loading";
import Error from "../components/Error";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCakeModule from "../components/AddCakeModule";


const Home = () => {

    const searchForm = document.querySelector('.search-form')
    const [searchValue, setSearchValue] = useState('')
    const [isInitialMount, setIsInitialMount] = useState(true)
    const dispatch = useDispatch()
    const cakes = useSelector(state => state.cakes)
    const currentUser = useSelector(state => state.currentUser)

    useEffect(()=>{
        if(!cakes.cakes.length || previousSearch) {
            dispatch(deleteCakes())
            dispatch(fetchCakes({limit: CAKES_IN_LINE*LINES_ON_START }))
        }
    }, [])

    useEffect(()=>{
        if (searchForm)
            searchForm.addEventListener('submit', e=>{
                e.preventDefault();
                setSearchValue(searchForm.term.value.trim().toLowerCase())
            })
    }, [searchForm])

    useEffect(()=>{
        if (isInitialMount) setIsInitialMount(false)
        else {
            dispatch(deleteCakes())            
            dispatch(fetchCakes({ limit: CAKES_IN_LINE*LINES_ON_START, searchValue }))
        }
    }, [searchValue])

    const fetchData = () => {
        console.log('reached end of page')
        dispatch(fetchCakes({page: cakes.page, limit: CAKES_IN_LINE , searchValue}))
    }

    
  const openPopup = () => {
    const popUp = document.getElementById('add-cake-popup')
    popUp?.classList.add('popup-container-color')
    popUp?.classList.remove('hidden')
    popUp?.firstChild.classList.add("module-show")
    popUp?.firstChild.classList.remove("module-hide")
    popUp.getElementsByTagName('form')[0].firstChild.focus()
  }

    return (
        <div className="home">
            <AddCakeModule />

            <div className="home-top">
                <form className="search-form">
                    <input type="text" name="term" placeholder="search cakes" />
                </form>
                { currentUser?.userInfo?.admin && 
                    <Link to="#" onClick={()=>openPopup()} title="add cake">
                        <AddCircleIcon className="icon"/>
                    </Link>
                }
            </div>

            { !!cakes.cakes.length && 
                <InfiniteScroll
                    dataLength={cakes.cakes.length}
                    next={fetchData}
                    hasMore={cakes.hasMore}
                >
                    <div className="products">
                        {cakes.cakes.map(cake => (
                            <div className="product-preview" key={cake.cakeId}>
                                <Link className='link' to={{pathname:`/products/${cake.cakeId}`, state:{ gotFrom: 'home'}}}>
                                    <img src={'data:image/png;base64,'+cake.image} width='100px'></img>
                                    <h2>{cake.title}</h2>
                                    <p className="price">{cake.price} ₪</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            }

            <Loading isLoading={cakes.loading} />
            <Error isError={(!cakes.loading && cakes.error)} errorMessage={cakes.error}/>

        </div>
    );
}

export default Home;

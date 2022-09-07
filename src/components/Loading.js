import { ColorRing } from 'react-loader-spinner'


const Loading = ({isLoading}) => {
  
  return (  
    isLoading &&
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
  );
}
 
export default Loading;
const Error = ({isError, errorMessage}) => {
  return ( 
      isError &&
        <div className="error" >
          <p><span>Error: </span>{errorMessage}</p>
        </div>
   );
}
 
export default Error;
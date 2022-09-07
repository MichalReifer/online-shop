const PageNotFound = ({isNotFound, msgNoAccess}) => {

    return (
      isNotFound &&
        <div className="not-found" style={{display: 'flex', flexDirection: 'column'}}>
            { msgNoAccess? 
              <>
                <h2>you are not authorised to access this page</h2>
                <img style={{alignSelf: 'center', width:600}} 
                src='https://gif-free.com/uploads/posts/2017-03/1489653293_face-in-birthday-cake.gif'/>
              </>
              : 
              <>
                <h2>oops... this page doesn't exist</h2>
                <img style={{alignSelf: 'center'}} 
                    src="https://media.giphy.com/media/o7lUKUH3hyz0YbgbJ6/giphy.gif" width="384" height="480" />
              </>
            }
        </div>
    );
}
 
export default PageNotFound;
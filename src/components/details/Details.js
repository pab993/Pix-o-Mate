import './styles.scss';

const Details = ({id}) => {
    return ( 
        <>
            {id &&
                <div className="details">
                <div className="details-container">Details</div>
                </div>
            }
        </>
     );
}
 
export default Details;
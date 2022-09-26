export const GET_LOCATION = "GET_LOCATION"

const setLocation = (props) => {
    return{
        type: GET_LOCATION,
        payload: {
            location: props
        }
    }
}

export default setLocation;
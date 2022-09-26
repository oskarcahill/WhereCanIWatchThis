export const GET_POSTERS = "GET_POSTERS"

const setPoster = (props) => {
    return{
        type: GET_POSTERS,
        payload: {
            posterURL: props
        }
    }
}

export default setPoster;
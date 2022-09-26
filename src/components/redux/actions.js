export const GET_ICONS = "GET_ICONS"

const setIcons = (props) => {
    return{
        type: GET_ICONS,
        payload: {
            stream: props[0],
            rent: props[1],
            buy: props[2]
        }
    }
}


export default setIcons;


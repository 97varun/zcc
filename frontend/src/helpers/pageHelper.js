import constants from "./constants";

function updatePage(direction, setState) {
    let pageUpdate = 0;
    if (direction === constants.DIRECTION_AFTER) {
        pageUpdate = 1;
    } else if (direction === constants.DIRECTION_BEFORE) {
        pageUpdate = -1;
    }

    setState((state, props) => ({
        page: state.page + pageUpdate,
    }));
}

export { updatePage };
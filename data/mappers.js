module.exports = {
    intToBoolean,
    zooToBody
}

function intToBoolean(int) {
    return int === 1 ? true : false;
}

function zooToBody(zoo) {
    return {
        ...zoo,
        completed: intToBoolean(zoo.completed)
    };
}
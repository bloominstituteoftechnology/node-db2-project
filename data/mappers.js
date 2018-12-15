module.exports = {
    zooToBody,
    bearToBody
}

function zooToBody(zoo) {
    return {
        ...zoo
    };
}

function bearToBody(bear) {
    return {
        ...bear
    };
}
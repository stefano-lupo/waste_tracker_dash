const objectToArray = (object) => {
    const data = []
    if (!object) {
        return data
    }

    Object.keys(object).forEach(k => {
        data.push([k, object[k]])
    })
    return data
}

export default objectToArray
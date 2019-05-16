

function objectToArray(object, withHeaders = []) {
    const data = []
    data.push(withHeaders)
    Object.keys(object).forEach(k => {
        data.push([k, object[k]])
    })
    return data
}

export default objectToArray
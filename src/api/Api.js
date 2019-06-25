const BASE = "http://localhost"
// const BASE = "http://0.0.0.0"
// const BASE = "http://10.42.0.1"
// const BASE = "http://192.168.1.155"
// const BASE = "http://172.20.10.2"
const BASE_URL = BASE + ":8080"
// const LORENZO_URL = BASE + "8090"
// const LORENZO_URL = "http://192.168.86.233"
const LORENZO_URL = "https://magna-tron.appspot.com/api/v0.1/participants"
// const LORENZO_URL = "https://temp.requestcatcher.com/test"

export default class Api {
    constructor(baseUrl = BASE_URL) {
        this.baseUrl = baseUrl;
    }
    
    getUserScores() {
        return fetch(LORENZO_URL)
        .then(r => {
            // console.log("Got repsonse")
            // console.log(r)
            if (!r.ok) { throw r }
            return r.json()
        });
    }

    postUserScore(id, score){
        const url = LORENZO_URL + "/" + id
        // var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        // const fullUrl = proxyUrl + url;
        // fetch(proxyUrl + url)
        // .then(blob => blob.json())
        // .then(data => {
        //     console.table(data);
        //     document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
        //     return data;
        // })
        // .catch(e => {
        //     console.log(e);
        //     return e;
        // });
        console.log(url)
        fetch(url, {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ score })
        })
        .then(res => {
            if (!res.ok) {
                console.log("Lorenzo API call failed")
                return
            }

            console.log("Lorenzo API call succeeded")  
            return res.json()
        })
        .then(json => console.log(json))
    }

    withBase(endpoint=BASE_URL) {
        return BASE_URL + endpoint
    }

    getWasteByMenuItem() {
        return this.get("/waste/menu_item");
    }

    getWasteOverTime() {
        return this.get("/waste/per_hour");
    }

    getWasteByIngredient() {
        return this.get("/waste/ingredient");
    }

    getRecentScans() {
        return this.get("/scans/recent");
    }
    
    getDetectionByScanId(scanId) {
        return this.get("/detections", {"scan_id": scanId})
    }

    getImageUrlByScanId(scanId) { 
        return this.withBase("/image" + this.generateQueryString({"scan_id": scanId}));
    }

    getImageById(imageId) {
        return this.get("/image", { "image_id": imageId })
    }

    getImageByScanId(scanId) {
        return this.get("/image", { "scan_id": scanId })
    }

    get(endpoint, queryParams = {}) {
        const url = this.withBase(endpoint + this.generateQueryString(queryParams));
        console.log(url)
        return fetch(url)
        .then(r => {
            // console.log("Got repsonse")
            // console.log(r)
            if (!r.ok) { throw r }
            return r.json()
        });
    }

    generateQueryString(queryParams) {
        if (!queryParams) {
            return "";
        }
        return "?" + Object.keys(queryParams)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(queryParams[k]))
             .join('&');
    }
}
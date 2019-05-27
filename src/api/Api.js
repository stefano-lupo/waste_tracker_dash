const BASE_URL = "http://localhost:8080"

export default class Api {
    constructor(baseUrl = BASE_URL) {
        this.baseUrl = baseUrl;
    }

    withBase(endpoint) {
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

    getRecentImages() {
        return this.get("/images/recent");
    }
    
    getDetectionByScanId(id) {
        return this.get("/detections/scan/" + id)
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
            console.log("Got repsonse")
            console.log(r)
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
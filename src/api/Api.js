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
        return this.get("/images/recent")
    }

    getImageUrl(filename) {
        return this.withBase("/static/images/" + filename)
    }

    get(endpoint) {
        return fetch(this.withBase(endpoint))
        .then(r => {
            console.log("Got repsonse")
            console.log(r)
            if (!r.ok) { throw r }
            return r.json()
        });
    }
}
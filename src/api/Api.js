const BASE_URL = "http://localhost:8080"

export default class Api {
    constructor(baseUrl = BASE_URL) {
        this.baseUrl = baseUrl;
    }

    withBase(endpoint) {
        return BASE_URL + endpoint
    }

    getWasteByMenuItem() {
        return fetch(this.withBase("/waste/menu_item"))
            .then(resp => resp.json())
    }
}
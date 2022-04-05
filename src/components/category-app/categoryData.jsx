const categoryData = {
    "data": [{
            "id": "2098",
            "type": "section",
            "attributes": {
                "data_source": "continue_watching",
                "title": "Lanjut Nonton, Yuk!",
                "variation": "landscape_horizontal",
                "segment_list": []
            },
            "relationships": {
                "category": { "data": { "id": "55", "type": "category" } }
            },
            "links": { "self": "landscapeData.json" }
        },
        {
            "id": "3060",
            "type": "section",
            "attributes": {
                "data_source": "Top 10 This Week",
                "title": "Siaran Pilihan",
                "variation": "portrait_horizontal",
                "segment_list": []
            },
            "relationships": {
                "category": { "data": { "id": "55", "type": "category" } }
            },
            "links": { "self": "portraitData.json" }
        }
    ],
    "included": [{
        "id": "55",
        "type": "category",
        "attributes": { "name": "Live", "ahoy_title": "CATEGORY_PAGE" },
        "relationships": {},
        "links": { "self": "https://www.vidio.com/categories/55" }
    }]
}

export default categoryData;
# knockout-dynamic-form
script to generate dynamic forms based on JSON input using knockout.

Script at `./src/script.js`

Dependency: `knockout`, `jQuery`

### To run demo
1. Go to DEMO dir `cd demo`
2. Install the required node packages `npm install`
3. Start the http server `npm start`
4. Open in browser `http://localhost:8099`

### Data format
```JSON
[{
    "field_type": "select",
    "field_name": "workitems",
    "children": [{
        "field_type": "value",
        "field_name": "incident",
        "field_index": 0,
        "children": [{
            "field_type": "select",
            "field_name": "incident templates",
            "children": [{
                "field_type": "value",
                "field_name": "int fist template",
                "field_index": 0
            }, {
                "field_type": "value",
                "field_name": "generic incident templates",
                "field_index": 1,
                "children": [{
                    "field_type": "select",
                    "field_name": "select generic incident template",
                    "children": [{
                        "field_type": "value",
                        "field_name": "only option",
                        "field_index": 0
                    }]
                }, {
                    "field_type": "text",
                    "field_name": "name of generic incident",
                    "field_value": "google"
                }]
            }, {
                "field_type": "value",
                "field_name": "quick action template",
                "field_index": 2
            }]
        }]
    },{
        "field_type": "value",
        "field_name": "alert",
        "field_index": 1,
        "children": [{
            "field_type": "select",
            "field_name": "alert templates",
            "children": [{
                "field_type": "value",
                "field_name": "int (a) fist template",
                "field_index": 0
            }, {
                "field_type": "value",
                "field_name": "generic (a) incident templates",
                "field_index": 1
            }, {
                "field_type": "value",
                "field_name": "quick (a) action template",
                "field_index": 2
            }]
        }]
    },{
        "field_type": "value",
        "field_name": "event",
        "field_index": 2,
        "children": []
    }]
}, {
    "field_type": "text",
    "field_name": "templates",
    "field_value": "boo"
}, {
    "field_type": "date",
    "field_name": "datetime",
    "field_value": "2012-12-12"
}, {
    "field_type": "checkbox",
    "field_name": "Use Template",
    "field_value": true,
    "children": [{
        "children": [{
            "field_type": "text",
            "field_name": "templates (unchecked)",
            "field_value": "boo"
        }, {
            "field_type": "date",
            "field_name": "datetime (unchecked)",
            "field_value": "2012-12-12"
        }]
    }, {
        "children": [{
            "field_type": "text",
            "field_name": "templates (checked)",
            "field_value": "boo"
        }, {
            "field_type": "date",
            "field_name": "datetime (checked)",
            "field_value": "2012-12-12"
        }]
    }]
}]
```
### Output
![screenshot](./screenshots/form_screenshot.png)
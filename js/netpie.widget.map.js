// Developed by Mine ArithmeticOp
// Set location by user
// Longdo Map API V.1 Plugin

(function () {

    var longdoWidget = function (settings) {
        var self = this
        self.widgetID = randomString(16);
        var mapElement = $("<div id=\"map_ld" + self.widgetID + "\"></div>");
        var currentSettings = settings

        // current Settings default
        if (currentSettings.style === undefined)
            currentSettings.style = 'map'
        if (currentSettings.toolbar === undefined)
            currentSettings.toolbar = false
        if (currentSettings.traffic === undefined)
            currentSettings.traffic = false
        if (currentSettings.zoom === undefined)
            currentSettings.zoom = 8

        var map
        var currentPosition = {}
        var marker
        var markerOptions = {
            icon: {
                url: 'img/placeholder.png'
            }
        }

        this.render = function (element) {
            $(element).append(mapElement)
            setHeight()
            var maphtml = document.getElementById('map_ld' + self.widgetID)
            var defaultPosition = { lon: 0, lat: 0 }
            currentPosition = defaultPosition
            function initializeMap() {
                var options = {
                    placeholder: maphtml,
                    location: currentPosition,
                    zoom: currentSettings.zoom,
                    language: 'th',
                    lastView: false
                }
                map = new longdo.Map(options)
                updatePosition(currentPosition)
                mapOptions(currentSettings)
            }
            initializeMap()
        }

        this.onSettingsChanged = function (newSettings) {
            currentSettings = newSettings
            // Map & Marker
            if (currentSettings.lat === "" || currentSettings.lat === undefined) currentPosition.lat = 0
            if (currentSettings.lon === "" || currentSettings.lon === undefined) currentPosition.lon = 0
            updatePosition(currentPosition)

            // Options
            mapOptions(currentSettings)

            // Height
            setHeight()
        }

        this.onCalculatedValueChanged = function (settingName, newValue) {
            // Map & Marker
            if (settingName == "lat") {
                currentPosition.lat = newValue
            }
            if (settingName == "lon") {
                currentPosition.lon = newValue
            }
            updatePosition(currentPosition)
        }

        this.onDispose = function () {
        }

        this.getHeight = function () {
            if (currentSettings.height_block === undefined) {
                currentSettings.height_block = 4;
            }
            return Number(currentSettings.height_block);
        }

        this.onSettingsChanged(settings)

        function setHeight() {
            if (currentSettings.height_block === undefined) {
                currentSettings.height_block = 4;
            }
            mapElement.css({
                height: currentSettings.height_block * 60 + "px",
            });
        }

        function updatePosition(currentPosition) {
            if (map && currentPosition) {
                // Map & Marker & Zoom
                map.location(currentPosition)
                setPosition(currentPosition)
            }
        }

        function mapOptions(currentSettings) {
            if (map) {
                // style
                if (currentSettings.style === "map") map.Layers.setBase(longdo.Layers.POI_EN)
                else if (currentSettings.style === "hybrid") map.Layers.setBase(longdo.Layers.GOOGLE_HYBRID)

                // Toolbars
                toolbars(currentSettings.toolbar)

                // Traffic
                mapTraffic(currentSettings.traffic)

                // Zoom
                map.zoom(currentSettings.zoom)
            }
        }

        function toolbars(bool) {
            map.Ui.Zoombar.visible(bool);
            map.Ui.Toolbar.visible(bool);
            map.Ui.Fullscreen.visible(bool);
            map.Ui.Crosshair.visible(bool);
            map.Ui.DPad.visible(bool);
            map.Ui.LayerSelector.visible(bool);
        }

        function mapTraffic(traffic) {
            if (traffic) map.Layers.insert(1, longdo.Layers.TRAFFIC)
            else if (!traffic) map.Layers.clear()
        }

        function setPosition(position) {
            map.Overlays.clear()
            marker = new longdo.Marker(position, markerOptions)
            map.Overlays.add(marker)
        }
    }

    freeboard.loadWidgetPlugin({
        "type_name": "map",
        "display_name": "Map",
        "external_scripts": ["plugins/thirdparty/longdo.js"],
        "settings": [
            {
                "name": "lat",
                "display_name": "Latitude",
                "type": "calculated"
            },
            {
                "name": "lon",
                "display_name": "Longitude",
                "type": "calculated"
            },
            {
                "name": "zoom",
                "display_name": "Zoom",
                "type": "option",
                "options": [
                    {
                        "name": "1",
                        "value": "1"
                    },
                    {
                        "name": "2",
                        "value": "2"
                    },
                    {
                        "name": "3",
                        "value": "3"
                    },
                    {
                        "name": "4",
                        "value": "4"
                    },
                    {
                        "name": "5",
                        "value": "5"
                    },
                    {
                        "name": "6",
                        "value": "6"
                    },
                    {
                        "name": "7",
                        "value": "7"
                    },
                    {
                        "name": "8",
                        "value": "8"
                    },
                    {
                        "name": "9",
                        "value": "9"
                    },
                    {
                        "name": "10",
                        "value": "10"
                    },
                    {
                        "name": "11",
                        "value": "11"
                    },
                    {
                        "name": "12",
                        "value": "12"
                    },
                    {
                        "name": "13",
                        "value": "13"
                    },
                    {
                        "name": "14",
                        "value": "14"
                    },
                    {
                        "name": "15",
                        "value": "15"
                    },
                    {
                        "name": "16",
                        "value": "16"
                    },
                    {
                        "name": "17",
                        "value": "17"
                    },
                    {
                        "name": "18",
                        "value": "18"
                    },
                    {
                        "name": "19",
                        "value": "19"
                    },
                    {
                        "name": "20",
                        "value": "20"
                    }
                ]
            },
            {
                "name": "style",
                "display_name": "Styles",
                "type": "option",
                "options": [
                    {
                        "name": "Map",
                        "value": "map"
                    },
                    {
                        "name": "Satellite",
                        "value": "hybrid"
                    }
                ]
            },
            {
                "name": "traffic",
                "display_name": "Traffic",
                "type": "boolean",
                "default_value": 0
            },
            {
                "name": "toolbar",
                "display_name": "Toolbar",
                "type": "boolean",
                "default_value": 0
            },
            {
                "name": "height_block",
                "display_name": "Height Blocks",
                "type": "option",
                "options": [
                    {
                        "name": "1",
                        "value": "4"
                    },
                    {
                        "name": "2",
                        "value": "5"
                    },
                    {
                        "name": "3",
                        "value": "6"
                    }
                ]
            },
        ],

        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new longdoWidget(settings));
        }
    });
}());

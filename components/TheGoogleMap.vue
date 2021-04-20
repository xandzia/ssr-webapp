<template>
  <div>
    <div class="google-map hidden-xs" id="mapFooter"></div>
    <script :src="mapUrl"></script>
  </div>
</template>

<script>
    export default {
        name: "TheGoogleMap",
        data(){
            return {
                marker: '',
                mapUrl: ''
            }
        },
        created() {
            this.mapUrl = 'https://maps.googleapis.com/maps/api/js?v=3.exp&language=' + this.$i18n.defaultLocale + '&key=AIzaSyCP0OYZXjJYsAV0e0EZTSsvrf7C5Y6YQ7o';
        },
        mounted () {
            this.$nextTick(() => {
                this.googleMapIni('mapFooter', 17, 50.4666905, 30.514838899999972);
            })
        },
        methods: {
            googleMapIni: (id, mapZoom, lat, lng) => {
                if (document.getElementById(id)) {
                    // Create google map
                    // Basic options for a simple Google Map
                    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                    var mapOptions = {
                        // How zoomed in you want the map to start at (always required)
                        zoom: mapZoom,
                        scrollwheel: false, // The latitude and longitude to center the map (always required)
                        center: new window.google.maps.LatLng(lat, lng),
                        styles: [{
                            'featureType': 'water',
                            'elementType': 'geometry',
                            'stylers': [{
                                'color': '#e9e9e9'
                            }, {
                                'lightness': 17
                            }]
                        },
                            {
                            'featureType': 'landscape',
                            'elementType': 'geometry',
                            'stylers': [{
                                'color': '#f5f5f5'
                            }, {
                                'lightness': 20
                            }]
                        }, {
                            'featureType': 'road.highway',
                            'elementType': 'geometry.fill',
                            'stylers': [{
                                'color': '#ffffff'
                            }, {
                                'lightness': 17
                            }]
                        }, {
                            'featureType': 'road.highway',
                            'elementType': 'geometry.stroke',
                            'stylers': [{
                                'color': '#ffffff'
                            }, {
                                'lightness': 29
                            }, {
                                'weight': 0.2
                            }]
                        }, {
                            'featureType': 'road.arterial',
                            'elementType': 'geometry',
                            'stylers': [{
                                'color': '#ffffff'
                            }, {
                                'lightness': 18
                            }]
                        }, {
                            'featureType': 'road.local',
                            'elementType': 'geometry',
                            'stylers': [{
                                'color': '#ffffff'
                            }, {
                                'lightness': 16
                            }]
                        }, {
                            'featureType': 'poi',
                            'elementType': 'geometry',
                            'stylers': [{
                                'color': '#f5f5f5'
                            }, {
                                'lightness': 21
                            }]
                        }, {
                            'featureType': 'poi.park',
                            'elementType': 'geometry',
                            'stylers': [{
                                'color': '#dedede'
                            }, {
                                'lightness': 21
                            }]
                        }, {
                            'elementType': 'labels.text.stroke',
                            'stylers': [{
                                'visibility': 'on'
                            }, {
                                'color': '#ffffff'
                            }, {
                                'lightness': 16
                            }]
                        }, {
                            'elementType': 'labels.text.fill',
                            'stylers': [{
                                'saturation': 36
                            }, {
                                'color': '#333333'
                            }, {
                                'lightness': 40
                            }]
                        }, {
                            'elementType': 'labels.icon',
                            'stylers': [{
                                'visibility': 'off'
                            }]
                        }, {
                            'featureType': 'transit',
                            'elementType': 'geometry',
                            'stylers': [{
                                'color': '#f2f2f2'
                            }, {
                                'lightness': 19
                            }]
                        }, {
                            'featureType': 'administrative',
                            'elementType': 'geometry.fill',
                            'stylers': [{
                                'color': '#fefefe'
                            }, {
                                'lightness': 20
                            }]
                        }, {
                            'featureType': 'administrative',
                            'elementType': 'geometry.stroke',
                            'stylers': [{
                                'color': '#fefefe'
                            }, {
                                'lightness': 17
                            }, {
                                'weight': 1.2
                            }]
                        }]
                    };

                    let mapElement = document.getElementById(id);
                    // Create the Google Map using our element and options defined above
                    let map = new window.google.maps.Map(mapElement, mapOptions);
                    let image = '/images/map-marker.png';
                    const myLatLng = new window.google.maps.LatLng(lat, lng);

                    new window.google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        icon: image
                    })
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
  .google-map {
    min-height: 300px;
  }
</style>


<template>
  <div class="main">
    <div class="container-fluid dashboard">
      <div class="map-component">
        <!-- <h3>Maps</h3> -->
        <vl-map
          ref="map"
          data-projection="EPSG:4326"
          :load-tiles-while-animating="true"
          :load-tiles-while-interacting="true"
          :logo="false"
          :style="{ cursor: mapCursor, height: '100vh'}"
          class="map"
          @click="clickCoordinate = $event.coordinate"
          @postcompose="onMapPostCompose"
          @pointermove="onMapPointerMove"
        >
          <vl-view
            :zoom.sync="zoom"
            :center.sync="center"
            :rotation.sync="rotation"
          />

          <!-- interactions -->
          <vl-interaction-select :features.sync="selectedFeatures">
            <vl-style-func :factory="styleFuncFactory" />

            <template slot-scope="select">
              <!-- select styles -->
              <vl-style-box>
                <vl-style-stroke color="#423e9e" :width="7" />
                <vl-style-fill :color="[21, 208, 21, 0.7]" />
                <vl-style-circle :radius="5">
                  <vl-style-stroke color="white" :width="7" />
                  <vl-style-fill :color="[254, 178, 76, 0.7]" />
                </vl-style-circle>
              </vl-style-box>
              <!-- style при выборе элемента -->
              <vl-style-box :z-index="1">
                <vl-style-stroke color="#d43f45" :width="2" />
                <vl-style-circle :radius="5">
                  <vl-style-stroke color="red" :width="2" />
                </vl-style-circle>
              </vl-style-box>
              <!--// select styles -->

              <!-- selected feature popup -->
              <vl-overlay
                v-for="feature in select.features"
                :id="feature.id"
                :key="feature.id"
                :position="pointOnSurface(feature.geometry)"
                :auto-pan="true"
                :auto-pan-animation="{ duration: 300 }"
                class="feature-popup"
              >
                <template>
                  <section class="card">
                    <header class="card-header">
                      <p class="card-header-title">
                        ID : {{ feature.id }}
                      </p>
                      <a
                        class="card-header-icon"
                        title="Close"
                        @click="
                          selectedFeatures = selectedFeatures.filter(
                            (f) => f.id !== feature.id
                          )
                        "
                      >
                        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                          <svg
                            class="fill-current h-6 w-6 text-blue-900"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            style="width: 20px"
                          >
                            <title>Close</title>
                            <path
                              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                            />
                          </svg>
                        </span>
                      </a>
                    </header>
                    <div class="card-content" style="color: black">
                      <div class="content">
                        <table>
                          <tr>
                            <td>Is enable</td>
                            <td>:</td>
                            <td>{{ feature.properties.isEnable }}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </section>
                </template>
              </vl-overlay>
              <!--// selected popup -->
            </template>
          </vl-interaction-select>
          <!--// interactions -->

          <!-- base layers -->
          <vl-layer-tile
            :id="baseLayers.name"
            :key="baseLayers.name"
            :visible="baseLayers.visible"
          >
            <component :is="`vl-source-osm`" v-bind="baseLayers" />
          </vl-layer-tile>
          <!--// base layers -->

          <component :is="layer.cmp" :key="layer.id" v-bind="layer">
            <!-- add vl-source-* -->
            <component :is="layer.source.cmp" v-bind="layer.source">
              <!-- add static features to vl-source-vector if provided -->
              <div
                v-if="
                  layer.source.staticFeatures &&
                    layer.source.staticFeatures.length
                "
              >
                <vl-feature
                  v-for="feature in layer.source.staticFeatures"
                  :id="feature.id"
                  :key="feature.id"
                  :properties="feature.properties"
                >
                  <vl-style-box v-if="feature.properties.isEnable == 'true'">
                    <vl-style-text :text="feature.id" />
                    <vl-style-circle :radius="8">
                      <vl-style-stroke
                        :width="1"
                        color="white"
                      />
                      <vl-style-fill
                        :color="[21, 208, 21, 0.5]"
                      />
                    </vl-style-circle>
                  </vl-style-box>
                  <vl-style-box v-else>
                    <vl-style-text :text="feature.id" />
                    <vl-style-circle :radius="8">
                      <vl-style-stroke
                        :width="1"
                        color="white"
                      />
                      <vl-style-fill
                        :color="[208, 21, 21, 0.5]"
                      />
                    </vl-style-circle>
                  </vl-style-box>

                  <!--<vl-style-box>
                <vl-style-icon src="https://img.icons8.com/office/50/000000/place-marker.png" :anchor="[0.55, 0.3]" :rotation="-rotation"/>

              </vl-style-box>-->
                  <component
                    :is="geometryTypeToCmpName(feature.geometry.type)"
                    v-bind="feature.geometry"
                  />
                </vl-feature>
              </div>
            </component>
            <!--// vl-source-* -->
          </component>

          <!-- add style components if provided -->
          <!-- create vl-style-box or vl-style-func -->
          <div v-if="layer.style">
            <component
              :is="style.cmp"
              v-for="(style, i) in layer.style"
              :key="i"
              v-bind="style"
            >
              <!-- create inner style components: vl-style-circle, vl-style-icon, vl-style-fill, vl-style-stroke & etc -->
              <div v-if="style.styles">
                <component
                  :is="cmp"
                  v-for="(st, cmp) in style.styles"
                  :key="cmp"
                  v-bind="st"
                >
                  <!-- vl-style-fill, vl-style-stroke if provided -->
                  <vl-style-fill v-if="st.fill" v-bind="st.fill" />
                  <vl-style-stroke v-if="st.stroke" v-bind="st.stroke" />
                </component>
              </div>
            </component>
          </div>
        </vl-map>
        <div>Selected: {{ selectedFeatures.map((f) => f.id) }}</div>
        <div>Selected: {{ selectedFeatures }}</div>
        <div>Zoom: {{ zoom }}</div>
        <div>Center: {{ center }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { kebabCase } from 'lodash'
import { findPointOnSurface } from 'vuelayers/dist/ol-ext'
import { Fill, Stroke, Circle, Style } from 'ol/style/'
import mapData from '@/assets/exampledata.json'
const methods = {
  pointOnSurface: findPointOnSurface,
  geometryTypeToCmpName (type) {
    return 'vl-geom-' + kebabCase(type)
  },
  onMapPostCompose () {
    this.$refs.map.render()
  },
  onMapPointerMove ({ pixel }) {
    const hit = this.$refs.map.forEachFeatureAtPixel(pixel, () => true)
    if (hit) {
      this.mapCursor = 'pointer'
    } else {
      this.mapCursor = 'default'
    }
  },
  styleFuncFactory () {
    const fill = new Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
    const fillSelected = new Fill({
      color: 'rgba(50, 150, 255, 0.5)'
    })
    const stroke = new Stroke({
      color: 'blue',
      width: 3
    })
    return (feature) => {
      const selected =
        this.selectedFeatures.filter(f => f.id === feature.getId()).length >
        0

      const baseStyle = new Style({
        stroke,
        fill: selected ? fillSelected : fill
      })

      return [baseStyle]
    }
  }
}
export default {
  name: 'MapComponent',
  layout: 'content',
  data () {
    return {
      zoom: 14,
      center: [35.358187, 52.3423621],
      clickCoordinate: undefined,
      selectedFeatures: [],
      mapCursor: 'default',
      rotation: 0,
      baseLayers: [
        {
          name: 'osm',
          title: 'OpenStreetMap',
          visible: true
        }
      ],
      layer: {
        id: 'electroshields',
        title: 'Electroshields',
        cmp: 'vl-layer-vector',
        visible: true,
        renderMode: 'image', // 'image' or 'vector'
        updateWhileInteracting: true, // dop
        source: {
          cmp: 'vl-source-vector',
          // url: 'https://openlayers.org/en/latest/examples/data/geojson/countries.geojson',
          staticFeatures: []
        },
        style: [
          {
            cmp: 'vl-style-box',
            styles: {
              'vl-style-fill': {
                color: [4, 25, 5, 0.5]
              },
              'vl-style-stroke': {
                color: '#219e46',
                width: 20
              },
              'vl-style-text': {
                text: '79',
                font: '24px FontAwesome',
                fill: {
                  color: '#2355af'
                },
                stroke: {
                  color: 'red'
                }
              }
            }
          }
        ]
      }
    }
  },
  async mounted () {
    await mapData.forEach((data) => {
      if (data.LONGITUDE) {
        this.layer.source.staticFeatures.push({
          type: 'Feature',
          id: data['UNIQUE KEY'],
          properties: {
            isEnable: data['IS ENABLE']
          },
          geometry: {
            coordinates: [data.LONGITUDE, data.LATITUDE],
            type: 'Point'
          }
        })
      }
    })
  },
  methods
}
</script>

import React from 'react'
import L from 'leaflet'
import { createControlComponent } from '@react-leaflet/core'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const createMachineRoutingLayer = ({ orders, map }) => {

  // console.log(start, end);
  let instance = L.Routing.control({
    position: 'topright',
    waypoints: orders.map(order => L.latLng(order[0], order[1])),
    lineOptions: {
      styles: [
        {
          color: 'red',
          width: 5
        },
      ],
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: true,
  })
  return instance
}

const RoutingMachine = createControlComponent(createMachineRoutingLayer)

export default RoutingMachine
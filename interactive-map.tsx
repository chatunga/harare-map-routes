"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"

// Define types for our routes and locations
interface Location {
  lat: number
  lng: number
  name: string
}

interface Route {
  id: string
  start: Location
  end: Location
  color: string
  name: string
}

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [routes, setRoutes] = useState<Route[]>([
    {
      id: "1",
      start: { lat: 40.7128, lng: -74.006, name: "New York" },
      end: { lat: 34.0522, lng: -118.2437, name: "Los Angeles" },
      color: "#ef4444",
      name: "NY to LA",
    },
    {
      id: "2",
      start: { lat: 41.8781, lng: -87.6298, name: "Chicago" },
      end: { lat: 29.7604, lng: -95.3698, name: "Houston" },
      color: "#3b82f6",
      name: "Chicago to Houston",
    },
  ])

  const [newRoute, setNewRoute] = useState({
    startLat: "",
    startLng: "",
    startName: "",
    endLat: "",
    endLng: "",
    endName: "",
    color: "#10b981",
    name: "",
  })

  const colors = [
    "#ef4444", // red
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // yellow
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#84cc16", // lime
  ]

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
      // Dynamically import Leaflet
      import("leaflet").then((L) => {
        // Initialize map
        const map = L.map(mapRef.current!).setView([39.8283, -98.5795], 4) // Center of USA

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map)

        mapInstanceRef.current = map

        // Add CSS for Leaflet
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)

        // Render initial routes
        renderRoutes(map, L)
      })
    }
  }, [])

  useEffect(() => {
    if (mapInstanceRef.current && typeof window !== "undefined") {
      import("leaflet").then((L) => {
        renderRoutes(mapInstanceRef.current, L)
      })
    }
  }, [routes])

  const renderRoutes = (map: any, L: any) => {
    // Clear existing layers
    map.eachLayer((layer: any) => {
      if (layer.options && (layer.options.color || layer.options.icon)) {
        map.removeLayer(layer)
      }
    })

    // Add routes
    routes.forEach((route) => {
      // Add markers for start and end points
      const startMarker = L.marker([route.start.lat, route.start.lng])
        .addTo(map)
        .bindPopup(`<b>${route.start.name}</b><br/>Start of ${route.name}`)

      const endMarker = L.marker([route.end.lat, route.end.lng])
        .addTo(map)
        .bindPopup(`<b>${route.end.name}</b><br/>End of ${route.name}`)

      // Add polyline for the route
      const polyline = L.polyline(
        [
          [route.start.lat, route.start.lng],
          [route.end.lat, route.end.lng],
        ],
        {
          color: route.color,
          weight: 4,
          opacity: 0.8,
        },
      ).addTo(map)

      polyline.bindPopup(`<b>${route.name}</b><br/>From ${route.start.name} to ${route.end.name}`)
    })
  }

  const addRoute = () => {
    if (newRoute.startLat && newRoute.startLng && newRoute.endLat && newRoute.endLng && newRoute.name) {
      const route: Route = {
        id: Date.now().toString(),
        start: {
          lat: Number.parseFloat(newRoute.startLat),
          lng: Number.parseFloat(newRoute.startLng),
          name: newRoute.startName || "Start Point",
        },
        end: {
          lat: Number.parseFloat(newRoute.endLat),
          lng: Number.parseFloat(newRoute.endLng),
          name: newRoute.endName || "End Point",
        },
        color: newRoute.color,
        name: newRoute.name,
      }

      setRoutes([...routes, route])
      setNewRoute({
        startLat: "",
        startLng: "",
        startName: "",
        endLat: "",
        endLng: "",
        endName: "",
        color: colors[Math.floor(Math.random() * colors.length)],
        name: "",
      })
    }
  }

  const removeRoute = (id: string) => {
    setRoutes(routes.filter((route) => route.id !== id))
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Interactive Route Map</h1>
        <p className="text-muted-foreground">Add custom routes and markings to visualize your paths</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Map View</CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={mapRef} className="w-full h-[500px] rounded-lg border" style={{ minHeight: "500px" }} />
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Add New Route */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Route
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="routeName">Route Name</Label>
                <Input
                  id="routeName"
                  placeholder="e.g., Main Route"
                  value={newRoute.name}
                  onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Start Point</Label>
                <Input
                  placeholder="Location name"
                  value={newRoute.startName}
                  onChange={(e) => setNewRoute({ ...newRoute, startName: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Latitude"
                    type="number"
                    step="any"
                    value={newRoute.startLat}
                    onChange={(e) => setNewRoute({ ...newRoute, startLat: e.target.value })}
                  />
                  <Input
                    placeholder="Longitude"
                    type="number"
                    step="any"
                    value={newRoute.startLng}
                    onChange={(e) => setNewRoute({ ...newRoute, startLng: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>End Point</Label>
                <Input
                  placeholder="Location name"
                  value={newRoute.endName}
                  onChange={(e) => setNewRoute({ ...newRoute, endName: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Latitude"
                    type="number"
                    step="any"
                    value={newRoute.endLat}
                    onChange={(e) => setNewRoute({ ...newRoute, endLat: e.target.value })}
                  />
                  <Input
                    placeholder="Longitude"
                    type="number"
                    step="any"
                    value={newRoute.endLng}
                    onChange={(e) => setNewRoute({ ...newRoute, endLng: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="color">Route Color</Label>
                <div className="flex gap-2 mt-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        newRoute.color === color ? "border-gray-800" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewRoute({ ...newRoute, color })}
                    />
                  ))}
                </div>
              </div>

              <Button onClick={addRoute} className="w-full">
                Add Route
              </Button>
            </CardContent>
          </Card>

          {/* Existing Routes */}
          <Card>
            <CardHeader>
              <CardTitle>Current Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {routes.map((route) => (
                  <div key={route.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: route.color }} />
                      <div>
                        <div className="font-medium">{route.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {route.start.name} → {route.end.name}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeRoute(route.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {routes.length === 0 && <p className="text-muted-foreground text-center py-4">No routes added yet</p>}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Click on markers and lines to see route details</p>
              <p>• Use different colors to categorize your routes</p>
              <p>• You can find coordinates using Google Maps or other mapping services</p>
              <p>• Routes are drawn as straight lines between points</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

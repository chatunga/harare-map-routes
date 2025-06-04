"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, MapPin } from "lucide-react";

// Define types for our routes and locations
interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface Route {
  id: string;
  waypoints: Location[];
  color: string;
  name: string;
}

export default function ZimbabweMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [routes, setRoutes] = useState<Route[]>([
    {
      id: "1",
      waypoints: [
        {
          lat: -17.825256221161336,
          lng: 31.053645279078687,
          name: "Fourth Street & Samora Machel",
        },
        {
          lat: -17.830504316809165,
          lng: 31.055268773442656,
          name: "Fourth Street & Robert Mugabe",
        },
        {
          lat: -17.83270377954578,
          lng: 31.055493179060033,
          name: "Kenneth Kaunda & Fourth Street",
        },
        {
          lat: -17.834081468267964,
          lng: 31.054061524314328,
          name: "Kenneth Kaunda",
        },
        {
          lat: -17.834409272068466,
          lng: 31.052533088852343,
          name: "Kenneth Kaunda & Second Street",
        },
        {
          lat: -17.835156892588632,
          lng: 31.049506423867136,
          name: "Kenneth Kaunda & Angwa Street",
        },
        {
          lat: -17.836146047211578,
          lng: 31.046703285164096,
          name: "Kenneth Kaunda & Seke Road",
        },
        {
          lat: -17.836538589356284,
          lng: 31.04551905324804,
          name: "Julius Nyerere & Charter(Fidel Castrol Road)",
        },
        {
          lat: -17.840532936354766,
          lng: 31.04134477160593,
          name: "Charter(Fidel Castrol Road) & Harare Street",
        },
        {
          lat: -17.83773787472936,
          lng: 31.041454012094956,
          name: "Harare Street & Bute Street",
        },
        {
          lat: -17.837766971538308,
          lng: 31.04209521150767,
          name: "Along Bute Street",
        },
        {
          lat: -17.837239038200913,
          lng: 31.041922995106958,
          name: "Market Square Bus Terminal",
        },
      ],
      color: "#ef4444",
      name: "Complete Route: Samora & Fourth to Harare & Bank",
    },
  ]);

  const [newRoute, setNewRoute] = useState({
    waypoints: [] as Location[],
    color: "#10b981",
    name: "",
  });

  const [currentWaypoint, setCurrentWaypoint] = useState({
    lat: "",
    lng: "",
    name: "",
  });

  const colors = [
    "#ef4444", // red
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // yellow
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#84cc16", // lime
  ];

  // Predefined Harare street coordinates using your exact coordinates
  const harareStreets = [
    {
      lat: -17.82947099495703,
      lng: 31.03297206710308,
      name: "Samora Machel & Rekai Tangwena",
    },
    {
      lat: -17.82808700394959,
      lng: 31.04342163675031,
      name: "Samora Machel & Chinhoyi Street",
    },
     {
      lat: -17.831307496569124,
      lng: 31.042644348248828,
      name: "Chinhoyi Street & Jason Moyo Avenue",
    },
    {
      lat: -17.82881997380518,
      lng: 31.024048630131762,
      name: "Samora Machel & Eddmonds Ave",
    },
    {
      lat: -17.82732700350954,
      lng: 31.01839090423796,
      name: "Samora Machel Ave(Past Bishop Gaul)",
    },
    {
      lat: -17.82887621074421,
      lng: 31.008745650272534,
      name: "Samora Machel Ave(Ok Marimba)",
    },
    {
      lat: -17.825505695506266,
      lng: 30.99518440168178,
      name: "National Sports Statium Area",
    },
    {
      lat: -17.824843165802598,
      lng: 30.990030623613738,
      name: "National Heros Acre Area",
    },
    {
      lat: -17.82544829018807,
      lng: 30.987139900438443,
      name: "National Heros Acre Area & Westhood Road",
    },
     {
      lat: -17.82551730899312,
      lng: 30.982293843390384,
      name: "National Heros Acre Area & Fourth Ave(Warren Park Area)",
    },
    {
      lat: -17.823933171352614,
      lng: 30.973959055116165,
      name: "Warren Park Area Round About",
    },
    {
      lat: -17.822620159801463,
      lng: 30.967032853798898,
      name: "Samora & Warren Park D Area",
    },
    {
      lat: -17.821923087310637,
      lng: 30.961039232873656,
      name: "Samora & Tynwald Road",
    },
    {
      lat: -17.820715666834218,
      lng: 30.946346374833556,
      name: "Samora Near Kuwadzana Round About",
    },
    {
      lat: -17.820337988923196,
      lng: 30.942372146059164,
      name: "Kuwadzana Round About Waypoint 1",
    },
    {
      lat: -17.820644462140613,
      lng: 30.94182235201599,
      name: "Kuwadzana Round About Waypoint 2",
    },
    {
      lat: -17.82029322312824,
      lng: 30.94121830198171,
      name: "Kuwadzana Round About Waypoint 3",
    },
    {
      lat: -17.81984383388764,
      lng: 30.94092414540875,
      name: "Bulawayo Road Past Kuwadzana Round About Waypoint 3",
    },
    {
      lat: -17.819020827875118,
      lng: 30.939267529111866,
      name: "Bulawayo Road",
    }, 
     {
      lat: -17.829537809280037,
      lng: 31.036162991613654,
      name: "Along Samora Machel",
    },
    {
      lat: -17.82875260784073,
      lng: 31.039984432727266,
      name: "Samora Machel & Prince Edward Street",
    },
    {
      lat: -17.831388134460596,
      lng: 31.031506752338114,
      name: "Robert Mugabe & Rekai Tangwena",
    },
    {
      lat: -17.833826847198637,
      lng: 31.038702801196514,
      name: "Robert Mugabe & Rotten Row",
    },
    {
      lat: -17.83462926930266,
      lng: 31.040704345115866,
      name: "Robert Mugabe & Kaguvi Street",
    },
    {
      lat: -17.834024582867183,
      lng: 31.043380233134624,
      name: "Robert Mugabe & Chinhoyi Street",
    },
    {
      lat: -17.83321991818833,
      lng: 31.046786363623845,
      name: "Robert Mugabe & Julius Nyerere",
    },
    {
      lat: -17.832020056416624,
      lng: 31.051893058469954,
      name: "Robert Mugabe & Second Street",
    },
    {
      lat: -17.831234428255485,
      lng: 31.05513913582268,
      name: "Robert Mugabe & Fourth Street",
    },
     {
      lat: -17.83083447076905,
      lng: 31.056844701909625,
      name: "Robert Mugabe & Fith Street",
    },
     {
      lat: -17.830048837387462,
      lng: 31.05878534597576,
      name: "Eastlea Along Robert Mugabe",
    },
    
    {
      lat: -17.830249603323722,
      lng: 31.070259037311903,
      name: "Robert Mugabe & Chiremba Road",
    },
    {
      lat: -17.830809090653446,
      lng: 31.073415897713375,
      name: "Robert Mugabe & Wheeler Road",
    },
    {
      lat: -17.832026501830786,
      lng: 31.08020230079796,
      name: "Robert Mugabe & Daventry Road",
    },
    {
      lat: -17.832167179924316,
      lng: 31.08272020414782,
      name: "Robert Mugabe (Past Daventry Road)",
    },
     {
      lat: -17.833601007948843,
      lng: 31.087488874320606,
      name: "Robert Mugabe & Glenara Avenue",
    },
    {
      lat: -17.834163714669387,
      lng: 31.090472845607867,
      name: "Robert Mugabe & Rhodeville Avenue",
    },
    {
      lat: -17.834239463517314,
      lng: 31.094155918648262,
      name: "Robert Mugabe & Clyde Road",
    },
    {
      lat: -17.834293569815596,
      lng: 31.101743731211947,
      name: "Robert Mugabe Near Cresta Oasis Hotel",
    },
    {
      lat: -17.83402303816512,
      lng: 31.102999840965058,
      name: "Samora Machel & Mutare Road",
    },
    {
      lat: -17.83593025243061,
      lng: 31.104721571500164,
      name: "Mutare Road & Coronation Avenue",
    },
    {
      lat: -17.837053874820658,
      lng: 31.109748884372213,
      name: "Mutare Road & Msasa Road",
    },
    
    {
      name: "Fourth Street & Samora Machel",
      lat: -17.825256221161336,
      lng: 31.053645279078687,
    },
    {
      name: "Fourth Street & Robert Mugabe",
      lat: -17.830504316809165,
      lng: 31.055268773442656,
    },
    {
      name: "Keneth Kaunda & Fourth Street",
      lat: -17.83270377954578,
      lng: 31.055493179060033,
    },
    {
      name: "Keneth Kaunda & Seke Road",
      lat: -17.835683274363387,
      lng: 31.046722450283916,
    },
    {
      lat: -17.834081468267964,
      lng: 31.054061524314328,
      name: "Kenneth Kaunda",
    },
    {
      name: "Bulawayo road Samora Machel & Rekai Tangwena",
      lat: -17.828487821119367,
      lng: 31.034164627334476,
    },
    {
      name: "Samora Macheal & Chinhoyi Street",
      lat: -17.827816255778096,
      lng: 31.042614236750282,
    },
    {
      name: "Robert Mugabe & Rekai Tangwena",
      lat: -17.83138435580948,
      lng: 31.031473606151728,
    },
    {
      name: "Robert Mugabe & Samora Machel Avenue",
      lat: -17.83392945692122,
      lng: 31.102790338664594,
    },
    {
      lat: -17.835156892588632,
      lng: 31.049506423867136,
      name: "Kenneth Kaunda & Angwa Street",
    },
    {
      lat: -17.836234420046484,
      lng: 31.04678066815697,
      name: "Kenneth Kaunda & Seke Road",
    },
    {
      lat: -17.836538589356284,
      lng: 31.04551905324804,
      name: "Julius Nyerere & Charter(Fidel Castrol Road)",
    },
    {
      lat: -17.840532936354766,
      lng: 31.04134477160593,
      name: "Charter(Fidel Castrol Road) & Harare Street",
    },
    {
      lat: -17.83773787472936,
      lng: 31.041454012094956,
      name: "Harare Street & Bute Street",
    },
    {
      lat: -17.837766971538308,
      lng: 31.04209521150767,
      name: "Along Bute Street",
    },
    {
      lat: -17.837239038200913,
      lng: 31.041922995106958,
      name: "Market Square Bus Terminal",
    },
    {
      lat: -17.834409272068466,
      lng: 31.052533088852343,
      name: "Kenneth Kaunda & Second Street",
    },
    {
      lat: -17.83955638987155,
      lng: 31.048289621616533,
      name: "Seke Road Waypoint 1",
    },
    {
      lat: -17.843830965000635,
      lng: 31.050405854056894,
      name: "Seke Road Waypoint 2(ABC Auction Area)",
    },
    {
      lat: -17.84734408376023,
      lng: 31.05190421242289,
      name: "Seke Road Waypoint 3(Spar Arcadia Area)",
    },
    {
      lat: -17.852651845884584,
      lng: 31.053550673723148,
      name: "Seke Road Waypoint 4(Coca-Cola Area)",
    },
    {
      lat: -17.855479958813152,
      lng: 31.05481539004244,
      name: "Seke Road Waypoint 5",
    },
    {
      lat: -17.858014866675408,
      lng: 31.056687016496042,
      name: "Seke Road Waypoint 6",
    },
    {
      lat: -17.86139633995347,
      lng: 31.059011196749694,
      name: "Seke Road Waypoint 7(Metro Hypermarket Area)",
    },
    {
      lat: -17.865741780960484,
      lng: 31.061614829325872,
      name: "Seke Road Waypoint 8(Seke & Pitch Drive)",
    },
    {
      lat: -17.84669092252243,
      lng: 31.038354935681145,
      name: "Simon Mazorodze Flyover",
    },
    {
      lat: -17.85643204760046,
      lng: 31.030548827952632,
      name: "Simon Mazorodze & Paisley Road",
    },
    {
      lat: -17.873406638391433,
      lng: 31.019250513945174,
      name: "Simon Mazorodze & Willowvale Road",
    },
    {
      lat: -17.8854034077137,
      lng: 31.010996208479863,
      name: "Simon Mazorodze & Harare Drive",
    },  
    {
      lat: -17.860123456789012,
      lng: 31.025678901234567,
      name: "Simon Mazorodze & High Glen Road",
    },
    {
      lat: -17.864567890123456,
      lng: 31.020987654321098,
      name: "Simon Mazorodze & Chitungwiza Road",
    },
    {
      lat: -17.919967341962273,
      lng: 30.98557967063123,
      name: "Simon Mazorodze & Mbudzi Roundabout",
    },
    {
      lat: -17.928620598601313,
      lng: 30.979846476613893,
      name: "Simon Mazorodze & Amalinda Road",
    },
    {
      lat: -17.933555662617085,
      lng: 30.979609607897334,
      name: "Simon Mazorodze Glennora Area",
    },
    {
      lat: -17.945493661612005,
      lng: 30.978232082603718,
      name: "Simon Mazorodze & Crest Turn Off",
    },
    {
      lat: -17.960690706640456,
      lng: 30.97646343575501,
      name: "Simon Mazorodze Southlea Park Area",
    },
     {
      lat: -17.969993577403468,
      lng: 30.96983218063781,
      name: "Skyline Tolgate, Beatrice Road",
    },
    {
      lat: -17.980012239044573,
      lng: 30.962011981585455,
      name: "Beatrice Road & Lake Chivero",
    },
  
  ];

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      mapRef.current &&
      !mapInstanceRef.current
    ) {
      // Dynamically import Leaflet
      import("leaflet").then((L) => {
        // Initialize map centered on the route area
        const map = L.map(mapRef.current!).setView([-17.833, 31.048], 14); // Centered on your route

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        mapInstanceRef.current = map;

        // Add CSS for Leaflet
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        // Render initial routes
        renderRoutes(map, L);
      });
    }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && typeof window !== "undefined") {
      import("leaflet").then((L) => {
        renderRoutes(mapInstanceRef.current, L);
      });
    }
  }, [routes]);

  const renderRoutes = (map: any, L: any) => {
    // Clear existing layers except the base tile layer
    map.eachLayer((layer: any) => {
      if (layer.options && (layer.options.color || layer.options.icon)) {
        map.removeLayer(layer);
      }
    });

    // Add routes with waypoints
    routes.forEach((route) => {
      if (route.waypoints.length < 2) return;

      // Create markers for all waypoints
      route.waypoints.forEach((waypoint, index) => {
        let icon;
        if (index === 0) {
          // Start point - large circle with number
          icon = L.divIcon({
            html: `<div style="background-color: ${route.color}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">S</div>`,
            className: "custom-marker",
            iconSize: [22, 22],
            iconAnchor: [11, 11],
          });
        } else if (index === route.waypoints.length - 1) {
          // End point - arrow with E
          icon = L.divIcon({
            html: `<div style="background-color: ${route.color}; width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 20px solid ${route.color}; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); position: relative;"><span style="position: absolute; top: 8px; left: -4px; color: white; font-size: 8px; font-weight: bold;">E</span></div>`,
            className: "custom-marker",
            iconSize: [20, 20],
            iconAnchor: [10, 20],
          });
        } else {
          // Waypoint - numbered diamond
          icon = L.divIcon({
            html: `<div style="background-color: ${route.color}; width: 12px; height: 12px; transform: rotate(45deg); border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><span style="transform: rotate(-45deg); color: white; font-size: 8px; font-weight: bold;">${index}</span></div>`,
            className: "custom-marker",
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });
        }

        const marker = L.marker([waypoint.lat, waypoint.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<b>${waypoint.name}</b><br/>${route.name}<br/>Point ${
              index + 1
            } of ${route.waypoints.length}<br/>Lat: ${waypoint.lat.toFixed(
              6
            )}<br/>Lng: ${waypoint.lng.toFixed(6)}`
          );
      });

      // Create polyline through all waypoints
      const coordinates = route.waypoints.map((wp) => [wp.lat, wp.lng]);
      const polyline = L.polyline(coordinates, {
        color: route.color,
        weight: 6,
        opacity: 0.8,
        dashArray: "10, 5",
      }).addTo(map);

      polyline.bindPopup(
        `<b>${route.name}</b><br/>${route.waypoints.length} waypoints`
      );

      // Fit map to show the entire route
      const group = new L.featureGroup([polyline]);
      map.fitBounds(group.getBounds().pad(0.1));
    });
  };

  const addWaypoint = () => {
    if (currentWaypoint.lat && currentWaypoint.lng && currentWaypoint.name) {
      const waypoint: Location = {
        lat: Number.parseFloat(currentWaypoint.lat),
        lng: Number.parseFloat(currentWaypoint.lng),
        name: currentWaypoint.name,
      };
      setNewRoute({
        ...newRoute,
        waypoints: [...newRoute.waypoints, waypoint],
      });
      setCurrentWaypoint({ lat: "", lng: "", name: "" });
    }
  };

  const removeWaypoint = (index: number) => {
    const updatedWaypoints = newRoute.waypoints.filter((_, i) => i !== index);
    setNewRoute({ ...newRoute, waypoints: updatedWaypoints });
  };

  const addRoute = () => {
    if (newRoute.waypoints.length >= 2 && newRoute.name) {
      const route: Route = {
        id: Date.now().toString(),
        waypoints: newRoute.waypoints,
        color: newRoute.color,
        name: newRoute.name,
      };

      setRoutes([...routes, route]);
      setNewRoute({
        waypoints: [],
        color: colors[Math.floor(Math.random() * colors.length)],
        name: "",
      });
    }
  };

  const removeRoute = (id: string) => {
    setRoutes(routes.filter((route) => route.id !== id));
  };

  const selectStreet = (street: any, isStart: boolean) => {
    setCurrentWaypoint({
      lat: street.lat.toString(),
      lng: street.lng.toString(),
      name: street.name,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Zimbabwe Street Map</h1>
        <p className="text-muted-foreground">
          Navigate Harare streets with custom route markings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Harare City Center - Precise Route
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={mapRef}
                className="w-full h-[500px] rounded-lg border"
                style={{ minHeight: "500px" }}
              />
              <div className="mt-2 text-sm text-muted-foreground">
                <p>
                  • <strong>S</strong> = Start: Samora Machel & Fourth Street
                </p>
                <p>
                  • <strong>1-5</strong> = Waypoints numbered in sequence
                </p>
                <p>
                  • <strong>E</strong> = End: Harare Street & Bank Street
                </p>
                <p>• Red dashed line shows the complete route path</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Route Details */}
          {routes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Route Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routes.map((route) => (
                    <div key={route.id} className="space-y-2">
                      <div className="flex items-center gap-2 font-medium">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: route.color }}
                        />
                        <span className="text-sm">{route.name}</span>
                      </div>
                      <div className="space-y-1 ml-5">
                        {route.waypoints.map((waypoint, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            {index === 0 ? (
                              <div
                                className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                style={{ backgroundColor: route.color }}
                              >
                                S
                              </div>
                            ) : index === route.waypoints.length - 1 ? (
                              <div
                                className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent"
                                style={{ borderBottomColor: route.color }}
                              />
                            ) : (
                              <div
                                className="w-4 h-4 transform rotate-45 flex items-center justify-center"
                                style={{ backgroundColor: route.color }}
                              >
                                <span className="transform -rotate-45 text-white text-xs font-bold">
                                  {index}
                                </span>
                              </div>
                            )}
                            <span className="text-gray-700">
                              {waypoint.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

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
                  placeholder="e.g., Alternative Route"
                  value={newRoute.name}
                  onChange={(e) =>
                    setNewRoute({ ...newRoute, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Add Waypoint</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => {
                    const street = harareStreets.find(
                      (s) => s.name === e.target.value
                    );
                    if (street) {
                      setCurrentWaypoint({
                        lat: street.lat.toString(),
                        lng: street.lng.toString(),
                        name: street.name,
                      });
                    }
                  }}
                  value={currentWaypoint.name}
                >
                  <option value="">Select a street intersection...</option>
                  {harareStreets.map((street) => (
                    <option key={street.name} value={street.name}>
                      {street.name}
                    </option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Latitude"
                    type="number"
                    step="any"
                    value={currentWaypoint.lat}
                    onChange={(e) =>
                      setCurrentWaypoint({
                        ...currentWaypoint,
                        lat: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Longitude"
                    type="number"
                    step="any"
                    value={currentWaypoint.lng}
                    onChange={(e) =>
                      setCurrentWaypoint({
                        ...currentWaypoint,
                        lng: e.target.value,
                      })
                    }
                  />
                </div>
                <Button
                  onClick={addWaypoint}
                  variant="outline"
                  className="w-full"
                >
                  Add Waypoint
                </Button>
              </div>

              {newRoute.waypoints.length > 0 && (
                <div className="space-y-2">
                  <Label>Current Waypoints ({newRoute.waypoints.length})</Label>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {newRoute.waypoints.map((waypoint, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                      >
                        <span>
                          {index + 1}. {waypoint.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWaypoint(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="color">Route Color</Label>
                <div className="flex gap-2 mt-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        newRoute.color === color
                          ? "border-gray-800"
                          : "border-gray-300"
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

          {/* Current Routes */}
          <Card>
            <CardHeader>
              <CardTitle>Current Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {routes.map((route) => (
                  <div
                    key={route.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: route.color }}
                      />
                      <div>
                        <div className="font-medium">{route.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {route.waypoints.length} waypoints:{" "}
                          {route.waypoints[0]?.name} →{" "}
                          {route.waypoints[route.waypoints.length - 1]?.name}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRoute(route.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

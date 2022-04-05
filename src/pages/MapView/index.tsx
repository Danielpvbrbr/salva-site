/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import * as React from "react";
import * as ReactDom from "react-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import "./style.css";
import LocationSearchInput from '../LocationSearchInput';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const MapView: React.VFC = ({ AuthContext }) => {
  const { addAddres, user } = React.useContext(AuthContext);
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(16); // initial zoom
  const [city, setCity] = React.useState();
  const [district, setDistrict] = React.useState();
  const [num, setNum] = React.useState();
  const [road, setRoad] = React.useState();
  const [state, setState] = React.useState();
  const [position, setPosition] = React.useState([]);
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: -11.6681969,
    lng: -39.0232709,
  });

  const HandelSubmit = () => {
    // eslint-disable-next-line no-lone-blocks
    {
      clicks.map((latLng) => (
        setPosition(latLng.toJSON())
      ))

      if (road && num && num) {
        addAddres({
          latitude: position.lat || center.lat,
          longitude: position.lng || center.lng,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
          city: city,
          country: 'Brasil',
          district: district,
          num: num,
          road: road,
          state: state,
        });
      } else {
        alert('Preencha os campo')
      }

    }
  };

  const getDate = (e) => {
    setCenter({ ...center, lat: e.latLng.lat })
    setCenter({ ...center, lng: e.latLng.lng })
    let locat = e.data.terms
    setRoad(locat[0].value);
    setNum(locat[1].value);
    setDistrict(locat[2].value);
    setCity(locat[3].value);
    setState(locat[4].value);

  }

  const geolocat = (pos) => {
    setCenter({ ...center, lat: pos.coords.latitude });
    setCenter({ ...center, lng: pos.coords.longitude });
  };

  let options = {
    enableHighAccuracy: true,
    timeout: 100000,
    maximumAge: 0
  };

  const error = (err) => {
    // console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  navigator.geolocation.watchPosition(geolocat, error, options);

  const onClick = (e: google.maps.MapMouseEvent) => {
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    // console.log("onIdle");
    setZoom(m.getZoom()!);
    // setCenter(m.getCenter()!.toJSON());
  };
  let teste = 'width: 100%; padding: 0.25rem; box-sizing: border-box;font-size: larger;'
  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      
      <LocationSearchInput getDate={getDate} />
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
        Style={teste}
      />
      <label htmlFor="zoom">Cidade</label>
      <input
        type="text"
        id="zoom"
        name="zoom"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        Style={teste}
      />
      <label htmlFor="zoom">Rua</label>
      <input
        type="text"
        id="zoom"
        name="zoom"
        value={road}
        onChange={(event) => setRoad(event.target.value)}
        Style={teste}
      />

      <label htmlFor="zoom">Número:</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={num}
        onChange={(event) => setNum(Number(event.target.value))}
        Style={teste}
      />

      <label htmlFor="zoom">Bairro:</label>
      <input
        type="text"
        id="zoom"
        name="zoom"
        value={district}
        onChange={(event) => setDistrict(event.target.value)}
        Style={teste}
      />

      <label htmlFor="zoom">Estado:</label>
      <input
        type="text"
        id="zoom"
        name="zoom"
        value={state}
        onChange={(event) => setState(event.target.value)}
        Style={teste}
      />
      <br />

      {/* <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />

      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      /> */}
      {/* <h3>{clicks.length === 0 ? "Lacalização" : "Marcados"}</h3>
      {clicks.map((latLng, i) => (
        <pre key={i}>{latLng.toJSON()}</pre>
      ))} */}

      <button id="btnClear" style={{ width: '100%', height: 35, marginTop: 10 }} onClick={() => setClicks([])}>Limpar</button>
      <button id="btnSbm" style={{ width: '100%', height: 35, marginTop: 10 }} onClick={HandelSubmit}>Salvar</button>
    </div>
  );

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper apiKey={"AIzaSyDzVogdLkKB-ualOy7NX1aHTJ3TmLqX4pQ"} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
      {form}
    </div>
  );
};
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

// window.addEventListener("DOMContentLoaded", () => {
//   ReactDom.render(<MapView />, document.getElementById("root"));
// });

export default MapView;

import React, { useState } from 'react';
import './index.css';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';


export default function LocationSearchInput({ getDate }) {
    const [address, setAddress] = useState('');
    const [data, setData] = useState([]);

    if ("geolocation" in navigator) {
        /* geolocation is available */
    } else {
        alert("I'm sorry, but geolocation services are not supported by your browser.");
    }


    const handleChange = address => {
        setAddress(address);
    };

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);

        getDate({
            latLng,
            value,
            data
        });
    };


    return (
        <>
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div id="location">
                        <input
                            {...getInputProps({
                                placeholder: 'Digite seu endereço ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container" Style="position: absolute;  zIndex': 99;">
                            {loading && <div>Carregando...</div>}
                            {suggestions.map(suggestion => {
                                setData(suggestion);
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const Style = suggestion.active
                                    ? "background-color:#F3f3f3; cursor: pointer;"
                                    : "background-color:#FFF; cursor: pointer;" 

                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            Style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );

                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </>
    );
}

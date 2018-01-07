import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google-map';

class WeatherList extends Component {

    renderWeather(cityData) {
        const cityName = cityData.city.name;
        const country = cityData.city.country;
        const temps = cityData.list.map(datum => datum.main.temp);
        const pressures = cityData.list.map(datum => datum.main.pressure);
        const hunidities = cityData.list.map(datum => datum.main.humidity);
        const { lon, lat } = cityData.city.coord;
        // const lat = cityData.city.coord.lat;

        return (
            <tr key={cityName}>
                <td><GoogleMap lon={lon} lat={lat} /></td>
                <td><Chart data={temps} color="orange" units="K" /></td>
                <td><Chart data={pressures} color="red" units="hPa" /></td>
                <td><Chart data={hunidities} color="green" units="%" /></td>
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover" >
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (K)</th>
                        <th>Pressure (hPa)</th>
                        <th>Hunidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({ weather }) {
    return { weather }; // This is ES6 equivalence of {weather: weather}
}

export default connect(mapStateToProps)(WeatherList);
import React, { useState, useEffect } from 'react';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { View, Text, FlatList, Image } from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (props) => {
  const [info, setInfo] = useState({
    name: 'Loading !!',
    temp: 'Loading',
    humidity: 'Loading',
    desc: 'Loading',
    icon: 'Loading',
  });

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      let city = await AsyncStorage.getItem('newcity');
      if (!city) {
        city = props.route.params.city || 'London'; // Default to 'London' if no city is provided
      }

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=343f6f43dfgg979439003b0&units=metric`);
      const results = await response.json();

      setInfo({
        name: results.name,
        temp: results.main.temp,
        humidity: results.main.humidity,
        desc: results.weather[0].description,
        icon: results.weather[0].icon,
      });
    } catch (error) {
      console.error(error);
      alert('Failed to fetch weather data. Please try again later.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header name="Weather App" />
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Title style={{ color: '#00aaff', fontSize: 30 }}>{info.name}</Title>
        {info.icon && (
          <Image
            style={{ width: 120, height: 120 }}
            source={{ uri: `https://openweathermap.org/img/w/${info.icon}.png` }}
          />
        )}
      </View>

      <Card style={{ margin: 5, padding: 12 }}>
        <Title style={{ color: '#00aaff' }}>Temperature - {info.temp}°C</Title>
      </Card>
      <Card style={{ margin: 5, padding: 12 }}>
        <Title style={{ color: '#00aaff' }}>Humidity - {info.humidity}%</Title>
      </Card>
      <Card style={{ margin: 5, padding: 12 }}>
        <Title style={{ color: '#00aaff' }}>Description - {info.desc}</Title>
      </Card>
    </View>
  );
};

export default Home;

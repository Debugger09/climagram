import type { Mood } from '@/types';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cities } from '../../constants/cities';
import { MOODS } from '../../constants/moods';
import { useAuth } from '../../hooks/useAuth';
import { useWeather } from '../../hooks/useWeather';
import { createPost } from '../../lib/mockData';

export default function NewPostScreen() {
  const { user } = useAuth();
  const [caption, setCaption] = useState('');
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [weatherCondition, setWeatherCondition] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [mood, setMood] = useState<Mood>('heureux');

  const { data: weather, isLoading: weatherLoading } = useWeather(selectedCity.lat, selectedCity.lon);

  const moodOptions = MOODS;

  const handleCreatePost = () => {
    if (!caption || !selectedCity || !weather) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      city: selectedCity.name,
      lat: selectedCity.lat,
      lon: selectedCity.lon,
      mood,
      comment: caption,
      weather: {
        temp: weather.temp,
        feels_like: weather.feels_like,
        description: weather.description,
        humidity: weather.humidity,
        windSpeed: weather.windSpeed,
        windDeg: weather.windDeg,
        pressure: weather.pressure,
        clouds: weather.clouds,
        main: weather.main,
        icon: weather.icon,
        uvi: weather.uvi,
        sunrise: weather.sunrise,
        sunset: weather.sunset,
        hourly: weather.hourly,
        daily: weather.daily,
      },
      timestamp: new Date().toISOString(),
      image: `https://picsum.photos/400/400?random=${Math.floor(Math.random()*1000)}`,
      likes: 0,
      comments: [],
    };

    createPost(newPost);
    router.back();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.form}>
        <Text style={styles.title}>Créer une publication</Text>

        <View style={styles.imagePreview}>
          <Image
            source={{ uri: `https://picsum.photos/400/400?random=${Math.random()}` }}
            style={styles.image}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Écris une légende..."
          value={caption}
          onChangeText={setCaption}
          multiline
        />

        <Text style={styles.sectionTitle}>Ville</Text>
        <View style={{ backgroundColor: '#f5f5f5', borderRadius: 8, marginBottom: 16 }}>
          <Picker
            selectedValue={selectedCity.name}
            onValueChange={(itemValue) => {
              const city = cities.find(c => c.name === itemValue);
              if (city) setSelectedCity(city);
            }}
          >
            {cities.map(city => (
              <Picker.Item key={city.name} label={city.name} value={city.name} />
            ))}
          </Picker>
        </View>

        <Text style={styles.sectionTitle}>Température</Text>
        <View style={[styles.input, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3e3e3' }]}> 
          {weatherLoading ? (
            <Text>Chargement...</Text>
          ) : weather ? (
            <Text style={{ fontSize: 18 }}>{weather.temp}°C</Text>
          ) : (
            <Text>Non disponible</Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Humeur</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 }}>
          {[0, 2].map(rowStart => (
            <View key={rowStart} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
              {moodOptions.slice(rowStart, rowStart + 2).map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.moodButton,
                    mood === option.value && styles.moodButtonSelected,
                    { flex: 1, marginRight: rowStart === 0 ? 10 : 0 },
                  ]}
                  onPress={() => setMood(option.value as Mood)}
                >
                  <Text style={styles.moodEmoji}>{option.emoji}</Text>
                  <Text style={styles.moodLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
          <Text style={styles.buttonText}>Partager</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a73e8',
  },
  imagePreview: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  weatherOption: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  selectedWeather: {
    backgroundColor: '#1a73e8',
  },
  weatherIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  weatherText: {
    fontSize: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#1a73e8',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  moodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  moodButtonSelected: {
    backgroundColor: '#1a73e8',
    borderColor: '#1a73e8',
  },
  moodEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  moodLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
}); 
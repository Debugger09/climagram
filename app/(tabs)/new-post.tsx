import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { createPost } from '../../lib/mockData';

export default function NewPostScreen() {
  const { user } = useAuth();
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('Sunny');
  const [weatherIcon, setWeatherIcon] = useState('☀️');

  const weatherOptions = [
    { condition: 'Sunny', icon: '☀️' },
    { condition: 'Cloudy', icon: '☁️' },
    { condition: 'Rainy', icon: '🌧️' },
    { condition: 'Snowy', icon: '❄️' },
    { condition: 'Stormy', icon: '⛈️' },
  ];

  const handleCreatePost = () => {
    if (!caption || !location || !temperature) {
      alert('Please fill in all fields');
      return;
    }

    const newPost = {
      userId: user?.id || '1',
      image: `https://picsum.photos/400/400?random=${Math.random()}`,
      caption,
      location,
      weather: {
        temperature: parseInt(temperature),
        condition: weatherCondition,
        icon: weatherIcon,
      },
      likes: 0,
      comments: [],
    };

    createPost(newPost);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Create New Post</Text>

        <View style={styles.imagePreview}>
          <Image
            source={{ uri: `https://picsum.photos/400/400?random=${Math.random()}` }}
            style={styles.image}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Write a caption..."
          value={caption}
          onChangeText={setCaption}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />

        <View style={styles.weatherSection}>
          <Text style={styles.sectionTitle}>Weather</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Temperature (°C)"
            value={temperature}
            onChangeText={setTemperature}
            keyboardType="numeric"
          />

          <View style={styles.weatherOptions}>
            {weatherOptions.map((option) => (
              <TouchableOpacity
                key={option.condition}
                style={[
                  styles.weatherOption,
                  weatherCondition === option.condition && styles.selectedWeather,
                ]}
                onPress={() => {
                  setWeatherCondition(option.condition);
                  setWeatherIcon(option.icon);
                }}
              >
                <Text style={styles.weatherIcon}>{option.icon}</Text>
                <Text style={styles.weatherText}>{option.condition}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
          <Text style={styles.buttonText}>Share Post</Text>
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
  weatherSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  weatherOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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
}); 
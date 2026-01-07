import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const AboutUsScreen = ({ navigation }) => {
  const aboutText = `Recollect Impact is a waste management startup specializing in addressing the critical challenges of biomedical and hazardous waste disposal. As an empaneled member of the Suchitwa Mission for the collection of sanitary and biomedical waste in Kerala, we provide reliable and streamlined services for both B2C and B2B sectors. Our dedicated team and advanced software facilitate source segregation and efficient recycling, helping us manage waste in compliance with regulatory standards and environmental best practices. Since 2019, Recollect Impact has established itself as a leader in sustainable waste management solutions, recognized for its commitment to environmental responsibility and outstanding customer service. Serving over 200,000 satisfied customers, we work with municipalities, healthcare facilities, commercial entities, and residential communities across Kerala, all coordinated from our headquarters in Kochi. Our mission is clear: to build a comprehensive, technology-driven platform that ensures safe and sustainable biomedical and sanitary waste management, contributing to a cleaner, healthier future for everyone.`;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={styles.safe.backgroundColor} />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack?.()}
        >
          <Image
            source={require('../../../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>About Us</Text>

        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.paragraph}>{aboutText}</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0b1410', // very dark background like the screenshot
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: '12%',
    paddingBottom: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.27)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#ffffffff',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffffff',
    fontFamily: 'Poppins-SemiBold',
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 24,
  },

  card: {
backgroundColor: '#d1d1d1ff',
borderRadius: 30,
paddingVertical: 28,
paddingHorizontal: 24,
marginTop: 8,
elevation: 4,
shadowColor: '#000',
shadowOffset: { width: 3, height: 6 },
shadowOpacity: 0.15,
shadowRadius: 6,
},
  paragraph: {
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: 15,
    lineHeight: 26,
    fontFamily: 'Poppins-Medium',
    textAlign: 'left',
  },
});

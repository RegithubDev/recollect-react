import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const SchedulePickupScreen = ({ navigation,route }) => {

 const { address, selectedItems, selectedDate: prevDate } = route.params || {};
  const [selectedDate, setSelectedDate] = useState(prevDate || '');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
    <View style={styles.headerRow}>
                 <TouchableOpacity
                   style={styles.backButton}
                   onPress={() => navigation.goBack?.()}
                 >
                 <Image
                                 source={require('../../../assets/back.png')}
                                 style={styles.avatarImage}
                               />
                 </TouchableOpacity>
                 <Text style={styles.headerTitle}>Schedule a Pickup</Text>
               </View>

      <Text style={styles.subTitle}>Choose from available dates</Text>

      {/* Calendar */}
      <View style={styles.calendarCard}>
        <Calendar
          theme={{
            backgroundColor: '#b4b4b4ff',
            calendarBackground: '#000',
            textSectionTitleColor: '#9e9e9e',
            dayTextColor: '#9e9e9e',
            monthTextColor: '#fff',
            selectedDayBackgroundColor: '#c7dd7f',
            selectedDayTextColor: '#000',
            todayTextColor: '#c7dd7f',
            arrowColor: '#c7dd7f',
            textDisabledColor: '#444',
          }}
          minDate={new Date().toISOString().split('T')[0]}
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
        />
      </View>

      {/* Confirm Button */}
<TouchableOpacity
  style={[
    styles.confirmBtn,
    !selectedDate && { opacity: 0.5 },
  ]}
  disabled={!selectedDate}
  onPress={() => {
    navigation.replace('ConfirmPickup', {
      address,
      selectedItems,
      selectedDate,
    });
  }}
>
  <Text style={styles.confirmText}>Confirm Date</Text>
</TouchableOpacity>


    </SafeAreaView>
  );
};

export default SchedulePickupScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdfdff',
    padding: 16,
  },
   headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
   marginTop:'10%',
    paddingBottom: 18,
    marginRight:'5%'
  },
  backButton: {
    paddingRight: 10,
    paddingVertical: 4,
  },
    avatarImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: 22,
    color: '#000000ff',
    fontFamily: 'Poppins-SemiBold',
  },
  subTitle: {
    color: '#000000ff',
    marginVertical: 16,
    fontSize: 14,
  },
  calendarCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c9c9c9ff',
    overflow: 'hidden',
  },
  confirmBtn: {
    marginTop: 24,
    backgroundColor: '#c7dd7f',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  confirmText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

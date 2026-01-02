import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

function getVisibleRange(year, month) {
  const first = new Date(year, month - 1, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());

  const last = new Date(year, month, 0);
  const end = new Date(last);
  end.setDate(last.getDate() + (6 - last.getDay()));

  return { start, end };
}
const SchedulePickupScreen = ({ navigation,route }) => {


const { address, selectedItems, selectedDate: prevDate, serviceType, regionId } =
  route.params || {};

  const [selectedDate, setSelectedDate] = useState(prevDate || '');
  const [availableDates, setAvailableDates] = useState({});
  
  useEffect(() => {
    const value = !!selectedDate || selectedDate !== '' ? new Date(selectedDate) : new Date();
    console.log("result", getVisibleRange(value.getFullYear(), value.getMonth() + 1));
  }, [selectedDate])




 return (
    <SafeAreaView style={styles.container}>
      <View className="headerRow" style={styles.headerRow}>
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

      <View style={styles.calendarCard}>
        <Calendar
          theme={{
            backgroundColor: '#b4b4b4ff',
            calendarBackground: '#000',
            textSectionTitleColor: '#9e9e9e',
            dayTextColor: '#9e9e9e',
            monthTextColor: '#fff',
            selectedDayBackgroundColor: '#187D57',
            selectedDayTextColor: '#000',
            todayTextColor: '#187D57',
            arrowColor: '#187D57',
            textDisabledColor: '#444',
          }}
          minDate={new Date().toISOString().split('T')[0]}
         markedDates={availableDates}

          onDayPress={day => {
            if (!availableDates[day.dateString]?.disabled) {
              setSelectedDate(day.dateString);
            }
          }}
          onMonthChange={month => {
            fetchAvailableDates(month.year, month.month);
          }}
        />
      </View>

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
            serviceType,
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
    backgroundColor: '#0b1410',
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
    tintColor:'#fff'
  },

  headerTitle: {
    fontSize: 22,
    color: '#ffffffff',
    fontFamily: 'Poppins-SemiBold',
    
  },
  subTitle: {
    color: '#fffdfdff',
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
    backgroundColor: '#187D57',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  confirmText: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

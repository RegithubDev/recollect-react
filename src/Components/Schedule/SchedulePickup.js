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
import { getAvailablePickupDates } from '../../services/auth';

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


const { address, selectedItems, selectedDate: prevDate, serviceType, scrapRegionId } =
  route.params || {};
console.log("paramsroute",scrapRegionId,serviceType);
  const [selectedDate, setSelectedDate] = useState(prevDate || '');
  const [availableDates, setAvailableDates] = useState({});
  const today = new Date();

// min = today
const MIN_DATE = today.toISOString().split("T")[0];

// max = end of next month
const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
const MAX_DATE = nextMonth.toISOString().split("T")[0];

useEffect(() => {
  const value =
    !!selectedDate || selectedDate !== ""
      ? new Date(selectedDate)
      : new Date();

  fetchAvailableDates(value.getFullYear(), value.getMonth() + 1);
}, [selectedDate]);


const fetchAvailableDates = async (year, month) => {
  try {
    const { start, end } = getVisibleRange(year, month);

    const fromDate = start.toISOString().split("T")[0];
    const toDate = end.toISOString().split("T")[0];

    const res = await getAvailablePickupDates(scrapRegionId, fromDate, toDate);
console.log("API RESPONSE RAW:", res);


    if (!res.ok) {
      console.log("API error:", res.data);
      return;
    }

    const dates = {};

    // Mark everything disabled by default
    let d = new Date(start);
    while (d <= end) {
      const key = d.toISOString().split("T")[0];

    const isBeforeToday = key < MIN_DATE;
const isAfterMax = key > MAX_DATE;

dates[key] = {
  disabled: true,   // default: always disabled
  customStyles: {
    text: { color: "#666" }
  }
};



      d.setDate(d.getDate() + 1);
    }

// Enable only API returned dates
if (res?.data?.data && Array.isArray(res.data.data)) {
  res.data.data.forEach(item => {
    if (item.date >= MIN_DATE && item.date <= MAX_DATE) {
      dates[item.date] = {
        disabled: false,
        available: true,
        remainingSlots: item.remainingSlots,
        customStyles: {
          container: {
            backgroundColor: "#187D57",
            borderRadius: 50,
          },
          text: {
            color: "#ffffff",
            fontWeight: "700",
          }
        }
      };
    }
  });
}


    setAvailableDates(dates);
  } catch (err) {
    console.log("fetchAvailableDates failed", err);
  }
};




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
           markingType="custom"
  theme={{
    backgroundColor: '#b4b4b4ff',
    calendarBackground: '#000',
    textSectionTitleColor: '#9e9e9e',
    dayTextColor: '#9e9e9e',
    todayTextColor: '#187D57',
    arrowColor: '#187D57',
    textDisabledColor: '#444',
  }}
 minDate={MIN_DATE}
  maxDate={MAX_DATE}
  disableAllTouchEventsForDisabledDays={true}
          // minDate={new Date().toISOString().split('T')[0]}
         markedDates={availableDates}

onDayPress={day => {
  const date = day.dateString;

  if (availableDates[date]?.disabled) return;

  setSelectedDate(date);

  setAvailableDates(prev => {
    const updated = { ...prev };

    // reset ALL available dates to green again
    Object.keys(updated).forEach(k => {
      if (updated[k]?.available) {
        updated[k] = {
          ...updated[k],
          customStyles: {
            container: {
              backgroundColor: "#187D57",
              borderRadius: 50,
            },
            text: {
              color: "#ffffff",
              fontWeight: "700",
            }
          }
        };
      }
    });

    // apply selected style (white)
    updated[date] = {
      ...updated[date],
      customStyles: {
        container: {
          backgroundColor: "#ffffff",
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "#187D57"
        },
        text: {
          color: "#187D57",
          fontWeight: "900",
        }
      }
    };

    return updated;
  });
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
            scrapRegionId
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

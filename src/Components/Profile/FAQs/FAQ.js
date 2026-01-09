
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ICONS = {
  waste: require('../../../../assets/wastecollect.png'),
  calendar: require('../../../../assets/calender.png'),
  recycle: require('../../../../assets/recycle-bin.png'),
  location: require('../../../../assets/locate.png'),
  notification: require('../../../../assets/appnotify.png'),
  help: require('../../../../assets/general.png'),
  search: require('../../../../assets/search.png'),
  chat: require('../../../../assets/chat.png'),
  email: require('../../../../assets/user_indi.png'),
  phone: require('../../../../assets/user_indi.png'),
  chevronDown: require('../../../../assets/right-chevron.png'),
  chevronUp: require('../../../../assets/chevron.png'),
   Down: require('../../../../assets/down.png'),
  Up: require('../../../../assets/up.png'),

};

const faqData = [
  {
    title: 'Waste Collection',
    icon: ICONS.waste,
    items: [
      'What time should I put out my bins?',
      'What happens if my collection day falls on a holiday?',
      "My bin wasn't collected. What should I do?",
      'How do I request an extra collection?',
    ],
  },
  {
    title: 'Schedule & Calendar',
    icon: ICONS.calendar,
    items: [
      'How do I find my collection schedule?',
      'Can I sync the schedule with my calendar app?',
      'Why did my schedule change?',
    ],
  },
  {
    title: 'Recycling Guidelines',
    icon: ICONS.recycle,
    items: [
      'What can I put in my recycling bin?',
      'Why was my recycling rejected?',
      'Can I recycle pizza boxes?',
    ],
  },
  {
    title: 'Drop-off Locations',
    icon: ICONS.location,
    items: [
      'Where can I drop off large items?',
      'Is there a fee for drop-off facilities?',
    ],
  },
  {
    title: 'App & Notifications',
    icon: ICONS.notification,
    items: [
      'How do I set up collection reminders?',
      'Why am I not receiving notifications?',
      'Can I get notifications for special collection events?',
    ],
  },
  {
    title: 'General Questions',
    icon: ICONS.help,
    items: [
      'How do I update my address?',
      'Is the app free?',
      'How do I report an issue or give feedback?',
    ],
  },
];


const FaqScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleSection = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setExpandedItem(null);
  };

  const toggleItem = index => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
   <ScrollView
  style={styles.container}
 
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ paddingBottom: 50 }}
>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
        <Text style={styles.headerSubtitle}>
          Find answers to common questions about waste collection and recycling
        </Text>

     <View style={styles.searchBox}>
  <Image source={ICONS.search} style={styles.iconSmall} />
  <TextInput
    placeholder="Search for answers..."
    style={styles.searchInput}
  />
</View>

      </View>

      {/* FAQ Sections */}
      {faqData.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.card}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection(sectionIndex)}
          >
            <View style={styles.sectionTitleRow}>
             <Image source={section.icon} style={styles.iconMain} />

              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
         <Image
  source={
    expandedIndex === sectionIndex
      ? ICONS.chevronUp
      : ICONS.chevronDown
  }
  style={styles.iconSmall}
/>

          </TouchableOpacity>

          {expandedIndex === sectionIndex &&
            section.items.map((item, itemIndex) => (
              <View key={itemIndex}>
                <TouchableOpacity
                  style={styles.questionRow}
                  onPress={() => toggleItem(itemIndex)}
                >
                  <Text style={styles.questionText}>{item}</Text>
                     {/* <Image
  source={
    expandedIndex === itemIndex
      ? ICONS.Down
      : ICONS.Up
  }
  style={styles.iconSmall}
/> */}

                  {/* <Icon
                    name={
                      expandedItem === itemIndex
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                    size={20}
                    color="#777"
                  /> */}
                </TouchableOpacity>

                {expandedItem === itemIndex && (
                  <Text style={styles.answerText}>
                    This is a sample answer. Replace it with actual content
                    related to "{item}".
                  </Text>
                )}
              </View>
            ))}
        </View>
      ))}

      {/* Support Section */}
      <View style={styles.supportBox}>
       <Image source={ICONS.chat} style={styles.iconchat} />
        <Text style={styles.supportTitle}>Still have questions?</Text>
        <Text style={styles.supportText}>
          Can't find what you're looking for? Our support team is here to help.
        </Text>

        <TouchableOpacity style={styles.emailBtn}>
          {/* <Icon name="email-outline" size={20} color="#fff" /> */}
          <Text style={styles.btnText}>Email Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.callBtn}>
          {/* <Icon name="phone-outline" size={20} color="#2E8B57" /> */}
          <Text style={styles.callText}>Call Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FaqScreen;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1410',
  },
  header: {
    backgroundColor: '#2E8B57',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: '8%',
  },
  headerSubtitle: {
    color: '#E0F2E9',
    marginTop: '2%',
  },
  searchBox: {
    marginTop: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 8,
  },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 14,
    paddingVertical: 5,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  questionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  answerText: {
    padding: 15,
    paddingTop: 0,
    color: '#666',
    fontSize: 13,
  },
  supportBox: {
    alignItems: 'center',
    padding: 25,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
      color: '#ffffffff',
  },
  supportText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 10,
  },
  emailBtn: {
    flexDirection: 'row',
    backgroundColor: '#2E8B57',
    padding: 14,
    borderRadius: 12,
    width: '90%',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  callBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#2E8B57',
    padding: 14,
    borderRadius: 12,
    width: '90%',
    justifyContent: 'center',
    marginTop: 10,
  },
  callText: {
    color: '#2E8B57',
    marginLeft: 8,
    fontWeight: '600',
  },
  iconSmall: {
  width: 20,
  height: 20,
  resizeMode: 'contain',
},

iconMedium: {
  width: 22,
  height: 22,
  resizeMode: 'contain',
},
iconMain:{
      width: 22,
  height: 22,
  resizeMode: 'contain',
  tintColor:'#2E8B57'
},

iconLarge: {
  width: 40,
  height: 40,
  resizeMode: 'contain',
},
iconchat:{
          width: 42,
  height: 42,
  resizeMode: 'contain',
  tintColor:'#2E8B57'
}
});

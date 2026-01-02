import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getBioWasteCategories,buildBioWasteIcon, getScrapCategories,buildScrapIcon } from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TOKEN_KEY = 'tempToken';

const GRADIENTS = {
  yellow: ['#84bda9ff', '#84bda9ff'],
  red: ['#84bda9ff', '#84bda9ff'],
  white: ['#84bda9ff', '#84bda9ff'],
  blue: ['#84bda9ff', '#84bda9ff'],
};

export default function SelectItemScreen({ navigation,route }) {
 const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
const { serviceType } = route.params || {};
const isScrap = serviceType?.toLowerCase().includes('scrap');
const [scrapTab, setScrapTab] = useState('SCRAP'); // SCRAP | DISPOSALS

  useEffect(() => {
    loadCategories();
  }, []);

 const loadCategories = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    const data =
      serviceType?.toLowerCase().includes('scrap')
        ? await getScrapCategories(token)
        : await getBioWasteCategories(token);

    setCategories(data);
    if (data.length > 0) {
      setActiveCategoryId(data[0].id);
    }
  } catch (e) {
    console.log('Failed to load categories');
  }
};


  const toggleItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const activeCategory = categories.find(c => c.id === activeCategoryId);

const selectedItemObjects = categories
  .flatMap(cat => cat.types || [])
  .filter(item => selectedItems.includes(item.id));


  const getScrapPriceText = (item) => {
  if (!item.payable) return '';

  const unit = item.kg ? 'kg' : 'pc';
  return `₹${item.price}/${unit}`;
};

  return (
    <SafeAreaView style={styles.container}>
   
<View style={styles.headerRow}>
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => navigation.goBack()}
  >
    <Image
      source={require('../../../assets/back.png')}
      style={styles.avatarImage}
    />
  </TouchableOpacity>

  <Text style={styles.headerTitle}>Select your item</Text>
</View>

{/* ✅ SCRAP | DISPOSALS TOGGLE (ONLY FOR SCRAP) */}
{isScrap && (
  <View style={styles.scrapToggle}>
    <TouchableOpacity
      onPress={() => setScrapTab('SCRAP')}
      style={[
        styles.scrapTab,
        scrapTab === 'SCRAP' && styles.scrapTabActive,
      ]}
    >
      <Text
        style={[
          styles.scrapTabText,
          scrapTab === 'SCRAP' && styles.scrapTabTextActive,
        ]}
      >
        Scrap ✓
      </Text>
    </TouchableOpacity>

    <View style={styles.scrapDivider} />

    <TouchableOpacity
      onPress={() => setScrapTab('DISPOSALS')}
      style={styles.scrapTab}
    >
      <Text style={styles.scrapTabText}>
        Disposals <Text style={{ color: 'red' }}>ⓘ</Text>
      </Text>
    </TouchableOpacity>
  </View>
)}

      {/* PRICE BANNER */}
    {!isScrap && (
  <LinearGradient colors={['#B777F2', '#8B4FD9']} style={styles.priceBanner}>
    <Text style={styles.bannerText}>
      Domestic Hazardous Waste{'\n'}(incl Sanitary)
    </Text>
    <Text style={styles.priceText}>
      ₹45 <Text style={styles.gst}>+gst{'\n'}/kg</Text>
    </Text>
  </LinearGradient>
)}

      {/* CONTENT */}
      <View style={styles.content}>
        {/* LEFT CATEGORIES */}
      
      
<View style={styles.categories}>
 <View style={{ flex: 1 }}>
  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 140 }}
  >
    {categories.map(cat => {
      const colorMap = {
        'Yellow Category': '#f4d21f',
        'Red Category': '#ec1010ff',
        'White Category': '#b9b9b9ff',
        'Blue Category': '#6c93ffff',
      };

      return (
        <TouchableOpacity
          key={cat.id}
          onPress={() => setActiveCategoryId(cat.id)}
          style={[
            styles.categoryBox,
            {
              backgroundColor: colorMap[cat.category] || '#ccc',
              opacity: activeCategoryId === cat.id ? 1 : 0.35,
            },
          ]}
        >
          <Image
            source={require('../../../assets/hazard.png')}
            style={styles.categoryIcon}
          />

          <Text style={styles.catText}>
            {cat.category.replace(' ', '\n')}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
  </View>
</View>


        {/* ITEMS LIST */}
   <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ paddingBottom: '100%' }}
>
  {activeCategory?.types?.map(item => (
    <LinearGradient
      key={item.id}
     colors={GRADIENTS.yellow}
      style={styles.itemCard}
    >
      <Image
      source={{
  uri: serviceType?.toLowerCase().includes('scrap')
    ? buildScrapIcon(item.icon)
    : buildBioWasteIcon(item.icon),
}}

        style={styles.itemImage}
      />

   <View style={styles.itemTextContainer}>
  <Text style={styles.itemLabel}>{item.name}</Text>

  {isScrap && item.payable && (
    <Text style={styles.scrapPrice}>
      {getScrapPriceText(item)}
    </Text>
  )}
</View>

<TouchableOpacity onPress={() => toggleItem(item.id)}>
  <View
    style={[
      styles.checkCircle,
      selectedItems.includes(item.id) && styles.checkCircleSelected,
    ]}
  >
    {selectedItems.includes(item.id) && (
      <Image
        source={require('../../../assets/check.png')}
        style={styles.checkIcon}
      />
    )}
  </View>
</TouchableOpacity>

    </LinearGradient>
  ))}
</ScrollView>

      </View>
      {/* FIXED FOOTER */}
{selectedItems.length > 0 && (
  <View style={styles.footer}>
    <Text style={styles.footerText}>
      Total {selectedItems.length} Items
    </Text>

    <TouchableOpacity
      style={styles.nextButton}
    onPress={() =>
  navigation.navigate('ConfirmPickup', {
    selectedItems: selectedItemObjects,
     address: route.params?.address,
  })
}

    >
      <Text style={styles.nextText}>Next</Text>
      <Text style={styles.arrow}>››</Text>
    </TouchableOpacity>
  </View>
)}


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1410',
  },

headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
   marginTop:'10%',
    paddingBottom: 18,
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
itemTextContainer: {
  flex: 1,
  justifyContent: 'center',
},

itemLabel: {
  fontSize: 18,
  fontWeight: '800',
  color: '#000000ff',
},

scrapPrice: {
  fontSize: 14,
  fontWeight: '600',
  color: '#262626ff',
  marginTop: 4,
},


  headerTitle: {
    fontSize: 22,
    color: '#ffffffff',
    fontFamily: 'Poppins-SemiBold',
  },
categoryBox: {
  borderRadius: 18,
  paddingVertical: 22,
  alignItems: 'center',
  width: 80,
  marginBottom: 14, 
},

scrapToggle: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 12,
},

scrapTab: {
  paddingHorizontal: 16,
  paddingVertical: 6,
},

scrapTabActive: {
  borderBottomWidth: 2,
  borderBottomColor: '#2DE39E',
},

scrapTabText: {
  color: '#9CA3AF',
  fontSize: 16,
  fontWeight: '600',
},

scrapTabTextActive: {
  color: '#FFFFFF',
},

scrapDivider: {
  width: 1,
  height: 18,
  backgroundColor: '#444',
  marginHorizontal: 12,
},

hazardCircle: {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 6,
},
checkCircle: {
  width: 26,
  height: 26,
  borderRadius: 13,
  borderWidth: 2,
  borderColor: '#000',
  alignItems: 'center',
  justifyContent: 'center',
},

checkCircleSelected: {
  backgroundColor: '#2F80ED', // ✅ blue filled circle
  borderColor: '#2F80ED',
},

checkIcon: {
  width: 14,
  height: 14,
  resizeMode: 'contain',
  tintColor: '#fff',
},


categoryIcon: {
  width: 20,
  height: 20,
  resizeMode: 'contain',
  tintColor: '#000', // 🔥 makes hazard icon black
},

catText: {
  fontSize: 12,
  fontWeight: '700',
  textAlign: 'center',
  color: '#000',
},


  priceBanner: {
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bannerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  priceText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'right',
  },

  gst: {
    fontSize: 14,
  },

 content: {
  flex: 1,              // 🔥 REQUIRED
  flexDirection: 'row',
  paddingTop: 28,
  paddingHorizontal: 12,
},


  categories: {
    width: 90,
    alignItems: 'center',
     height: '100%',       
  },




//   categoryBox: {
//     borderRadius: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     marginBottom: 14,
//     width: 80,
//   },

  catText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    width: 310,
  },

  itemImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 14,
  },

  // itemLabel: {
  //   flex: 1,
  //   fontSize: 18,
  //   fontWeight: '600',
  //   color: '#000',
  // },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#000',
  },

  radioSelected: {
    backgroundColor: '#000',
  },
  footer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  paddingVertical: 26,
  backgroundColor: '#143C2B',
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
},

footerText: {
  color: '#ffffffff',
  fontSize: 18,
  fontWeight: '700',
},

nextButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#2de39e',
  paddingHorizontal: 24,
  paddingVertical: 12,
  borderRadius: 28,
},

nextText: {
  fontSize: 18,
  fontWeight: '700',
  color: '#000',
  marginRight: 6,
},

arrow: {
  fontSize: 22,
  fontWeight: '900',
  color: '#000',
},

});

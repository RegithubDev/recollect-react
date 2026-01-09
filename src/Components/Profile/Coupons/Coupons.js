import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const categories = ["All", "Food", "Shopping", "Transport"];

const featured = {
  title: "Complete Eco Starter Kit",
  brand: "ECOESSENTIALS",
  desc: "Get everything you need to start your sustainable journey.",
  discount: "40% OFF",
  expires: "2 days",
  points: 500,
  image:
    "https://images.pexels.com/photos/3811853/pexels-photo-3811853.jpeg",
};

const coupons = [
  {
    id: 1,
    title: "Fresh Organic Produce",
    brand: "GREEN MARKET",
    tag: "New",
    category: "Food",
    discount: "20% OFF",
    days: "3 days left",
    points: 150,
    image:
      "https://images.pexels.com/photos/3737643/pexels-photo-3737643.jpeg",
  },
  {
    id: 2,
    title: "Sustainable Fashion",
    brand: "ECOWEAR",
    category: "Shopping",
    discount: "₹200 OFF",
    days: "5 days left",
    points: 300,
    image:
      "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg",
  },
];

export default function CouponsScreen({navigation}) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? coupons : coupons.filter(c => c.category === active);

  return (
    <ScrollView style={styles.container}>
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
      
              <Text style={styles.headerTitle}>Coupons & Offers</Text>
      
              <View style={{ width: 36 }} />
            </View>
      <Text style={styles.header}>Featured Offer</Text>

      {/* Featured Card */}
      <View style={styles.featuredCard}>
        <Image source={{ uri: featured.image }} style={styles.featuredImage} />

        <View style={styles.featureContent}>
          <Text style={styles.brand}>{featured.brand}</Text>
          <Text style={styles.title}>{featured.title}</Text>
          <Text style={styles.desc}>{featured.desc}</Text>

          <View style={styles.row}>
            <Text style={styles.discount}>{featured.discount}</Text>
            <Text style={styles.expire}>⏱ Expires in {featured.expires}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.points}>{featured.points} pts</Text>
            <TouchableOpacity style={styles.redeemBtn}>
              <Text style={styles.redeemTxt}>Redeem Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Categories */}
      <Text style={styles.header}>Browse Coupons</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActive(cat)}
            style={[
              styles.category,
              active === cat && styles.categoryActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                active === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Coupons List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />

            <View style={styles.cardContent}>
              <View style={styles.tagsRow}>
                {item.tag && (
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{item.tag}</Text>
                  </View>
                )}
                <View style={styles.catTag}>
                  <Text style={styles.catText}>{item.category}</Text>
                </View>
              </View>

              <Text style={styles.brand}>{item.brand}</Text>
              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.time}>⏱ {item.days}</Text>

              <View style={styles.rowBetween}>
                <Text style={styles.points}>{item.points} pts</Text>

                <TouchableOpacity style={styles.redeemSmall}>
                  <Text style={styles.redeemSmallTxt}>Redeem</Text>
                </TouchableOpacity>

                <View style={styles.discountBadge}>
                  <Text style={styles.discountBadgeTxt}>{item.discount}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1410", padding: 16 },

  header: { fontSize: 18, fontWeight: "700", marginVertical: 10, color: "#ffffffff" ,marginTop:'12%'},
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
  featuredCard: {
    borderRadius: 18,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 18,
  },

  featuredImage: { width: "100%", height: 180 },

  featureContent: { padding: 14 },

  brand: { color: "#7B8C6C", fontWeight: "700" },

  title: { fontSize: 18, fontWeight: "800", color: "#1C2C20", marginTop: 2 },

  desc: { color: "#6F7F73", marginVertical: 6 },

  discount: { fontSize: 20, fontWeight: "900", color: "#1E7F46" },

  expire: { marginLeft: 10, color: "#6E6E6E" },

  row: { flexDirection: "row", alignItems: "center" },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  points: { fontWeight: "800", color: "#1C3E2D" },

  redeemBtn: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },

  redeemTxt: { color: "#fff", fontWeight: "700" },

  category: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d9e2d4",
    marginRight: 10,
  },

  categoryActive: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },

  categoryText: { color: "#2E7D32", fontWeight: "600" },

  categoryTextActive: { color: "#fff" },

  card: {
    borderRadius: 18,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginVertical: 10,
  },

  cardImage: { height: 150, width: "100%" },

  cardContent: { padding: 14 },

  tagsRow: { flexDirection: "row" },

  tag: {
    backgroundColor: "#C8F1C4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
  },

  tagText: { color: "#1F7D35", fontWeight: "700" },

  catTag: {
    backgroundColor: "#E5EFE3",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  catText: { color: "#3E5F42" },

  time: { color: "#6A6A6A", marginVertical: 6 },

  discountBadge: {
    backgroundColor: "#F0FFF4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
  },

  discountBadgeTxt: {
    color: "#1C7F40",
    fontWeight: "900",
  },

  redeemSmall: {
    backgroundColor: "#E6F3EA",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },

  redeemSmallTxt: { color: "#2E7D32", fontWeight: "700" },
});

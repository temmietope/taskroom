import React from "react";
import { StyleSheet, View } from "react-native";

export default function Card({ children, completed }) {
  const RenderNormalCard = () => (
    <View style={styles.card}>
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
  const RenderCompletedCard = () => (
    <View style={{ ...styles.card, ...styles.completedCard }}>
      <View style={styles.cardContent}>{children}</View>
    </View>
  );

  return <>{completed ? <RenderCompletedCard /> : <RenderNormalCard />}</>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 2,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 10,
    borderColor: "gray",
    padding: 10
  },
  completedCard: {
    backgroundColor: "rgba(172, 255, 47, 0.637)"
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20
  }
});

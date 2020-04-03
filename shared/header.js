import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { colors } from "../styles/color";
import moment from "moment";

// import LOGOSVG from "../assets/calendar.svg"
// import HeaderIcon from "../assets/calendar.svg";



const today = moment().format('dddd');
  const todayDate = moment().format("MMM Do, YYYY"); 

export const Header = ({ navigation, title }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    // <ImageBackground
    //   source={require("../assets/game_bg.png")}
    //   style={styles.header}
    // >
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.icon}
      />
      <View style={styles.headerTitle}>
        {/* <Image
          source={require("../assets/calendar.png")}
          style={styles.headerImage}
        /> */}
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>

    // </ImageBackground>
  );
};
export const HomeHeader = ({ navigation, title }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.homeHeader}>
      <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.homeHeaderIcon}
      />
      <View style={styles.homeHeaderTitle}>
        {/* <Image
          source={require("../assets/calendar.png")}
          style={styles.homeHeaderImage}
        /> */}
        <View style={styles.date}>
        <Text style={styles.today}>{today}</Text>
        <Text style={styles.todayDate}>{todayDate}</Text>
        <Text style={styles.homeHeaderText}>{title}</Text>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.app_color
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1
  },
  icon: {
    position: "absolute",
    left: 10
  },
  headerTitle: {
    flexDirection: "row"
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10
  },
  homeHeader: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  homeHeaderText: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
    letterSpacing: 1,
    fontFamily: "nunito-bold"
  },
  homeHeaderIcon: {
    position: "absolute",
    left: 20,
    top: 10
  },
  homeHeaderTitle: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "35%",
    left: 20,
    position: "absolute",
    bottom: 20,
  },
  homeHeaderImage: {
    width: 26,
    height: 26
  },
  today: {
    color: '#fff',
    fontSize: 15
  },
  todayDate: {
    color: '#fff',
    fontSize: 20

  }
});

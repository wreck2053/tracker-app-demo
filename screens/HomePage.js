import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import RingProgress from "../components/RingProgress";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";

const headerImage = require("../assets/images/header.jpg");
const notification = require("../assets/images/Notification.png");
const banner = require("../assets/images/BG.png");
const fire = require("../assets/images/fire.png");
const model = require("../assets/images/model.png");
const couple = require("../assets/images/couple.jpg");
const cycle = require("../assets/images/cycle.png");
const yoga = require("../assets/images/yoga.png");
const walk = require("../assets/images/walk.png");
const next = require("../assets/images/next.png");
const play = require("../assets/images/play.png");
const star = require("../assets/images/Star.png");
const book = require("../assets/images/Book.png");
const home = require("../assets/images/Home.png");
const heart = require("../assets/images/H.png");
const calendar = require("../assets/images/Calender.png");
const profile = require("../assets/images/User.png");
const plus = require("../assets/images/Plus.png");

const Header = () => (
  <View
    style={{
      paddingHorizontal: 5,
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <Image
      source={headerImage}
      style={{ height: 50, width: 50, borderRadius: 25 }}
    />
    <View style={{ paddingHorizontal: 10, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 16 }}>Hi, Jane</Text>
      <Text style={{ fontSize: 10 }}>Aug 12, 2021</Text>
    </View>
    <Image source={notification} style={{ height: 25, width: 25 }} />
  </View>
);

const Card = ({ data, index }) => {
  return (
    <View
      style={{
        flex: 1,
        height: index === 1 ? 180 : 150,
        padding: 10,
        alignSelf: "center",
        backgroundColor: data.color,
        justifyContent: "space-between",
        marginHorizontal: 8,
        borderRadius: 10,
        shadowColor: "lightgrey",
        shadowOffset: { width: -5, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        width: 115,
      }}
    >
      <TouchableOpacity onPress={() => console.log("Presssed " + data.name)}>
        <Image source={data.image} style={{ height: 25, width: 25 }} />
        <View style={{ alignSelf: "center", margin: 5 }}>
          <Progress.Circle
            size={50}
            progress={data.status / 100}
            showsText
            unfilledColor="#ededed"
            borderColor="#ededed"
            color={data.darkColor}
            direction="counter-clockwise"
            fill="white"
            strokeCap="round"
            thickness={5}
            style={{
              shadowColor: "grey",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 1,
            }}
            textStyle={{
              fontSize: 16,

              fontWeight: "bold",
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 10 }}>{"Day     1"}</Text>
          <Text style={{ fontSize: 10 }}>{"Time   20 min"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>{data.name}</Text>
          <View
            style={{
              backgroundColor: data.lightColor,
              padding: 2,
              borderRadius: 10,
            }}
          ></View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const TodaysProgress = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.label}>Calories</Text>
        <Text style={styles.value}>500</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Active Time</Text>
        <Text style={styles.value}>30 min</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Kilometers</Text>
        <Text style={styles.value}>5 km</Text>
      </View>
    </View>
  );
};

const VideoPlay = () => (
  <View
    style={{
      borderRadius: 15,
      marginHorizontal: 12,
      shadowOffset: { width: -5, height: 3 },
      shadowColor: "grey",
      shadowOpacity: 0.5,
      shadowRadius: 3,
      backgroundColor: "#fff",
    }}
  >
    <View style={{ borderRadius: 10, overflow: "hidden" }}>
      <ImageBackground
        source={couple}
        style={{
          height: 150,
          width: 300,
        }}
      >
        <LinearGradient
          locations={[0, 1.0]}
          colors={["rgba(0,0,0,0.00)", "rgba(0,0,0,0.60)"]}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        ></LinearGradient>
      </ImageBackground>
      <Text
        style={{
          position: "absolute",
          bottom: 5,
          left: 10,
          fontFamily: "Roboto",
          color: "#fff",
        }}
      >
        Transformation
      </Text>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#fff",
          padding: 5,
          right: 10,
          top: 10,
          borderRadius: 5,
        }}
      >
        <Image source={star} style={{ height: 10, width: 10 }} />
      </View>
    </View>
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 15,
      }}
    >
      <View
        style={{
          position: "absolute",
          backgroundColor: "#8860a2",
          padding: 10,
          right: 25,
          top: -15,
          borderRadius: 15,
          zIndex: 3,
        }}
      >
        <Image source={play} style={{ height: 10, width: 10 }} />
      </View>
      <Text style={{ fontFamily: "Roboto" }}>2 Hour Bulking Trainer</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: "Roboto", fontSize: 12 }}>
          <Image source={book} style={{ height: 15, width: 15 }} />
          {"   Beginner"}
        </Text>
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 12,
            color: "#8860a2",
          }}
        >
          45 Min
        </Text>
      </View>
    </View>
  </View>
);

export default function HomePage() {
  const steps = 7340;
  const goal = 10000;

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 20 }}>
        <Header />

        <View style={{ marginTop: 25 }}>
          <RingProgress radius={150} strokeWidth={50} progress={steps / goal} />
        </View>

        <TodaysProgress />

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              data={item}
              onPress={() => console.log(`Pressed ${item.name}`)}
            />
          )}
          horizontal={true}
          snapToInterval={100}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
        />

        <FlatList
          style={{ marginTop: 20 }}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VideoPlay
              data={item}
              onPress={() => console.log(`Pressed ${item.name}`)}
            />
          )}
          horizontal={true}
          snapToInterval={100}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const data = [
  {
    id: "1",
    name: "Cycling",
    status: 85,
    image: cycle,
    lightColor: "#f8e4d9",
    color: "#fcf1ea",
    darkColor: "#fac5a4",
  },
  {
    id: "2",
    name: "Walking",
    status: 25,
    image: walk,
    lightColor: "#d7f0f7",
    color: "#e8f7fc",
    darkColor: "#aceafc",
  },
  {
    id: "3",
    name: "Yoga",
    status: 85,
    image: yoga,
    lightColor: "#dad5fe",
    color: "#e7e3ff",
    darkColor: "#8860a2",
  },
  {
    id: "4",
    name: "Cycling",
    status: 85,
    image: cycle,
    lightColor: "#f8e4d9",
    color: "#fcf1ea",
    darkColor: "#fac5a4",
  },
  {
    id: "11",
    name: "Cycling",
    status: 85,
    image: cycle,
    lightColor: "#f8e4d9",
    color: "#fcf1ea",
    darkColor: "#fac5a4",
  },
  {
    id: "12",
    name: "Walking",
    status: 25,
    image: walk,
    lightColor: "#d7f0f7",
    color: "#e8f7fc",
    darkColor: "#aceafc",
  },
  {
    id: "13",
    name: "Yoga",
    status: 85,
    image: yoga,
    lightColor: "#dad5fe",
    color: "#e7e3ff",
    darkColor: "#8860a2",
  },
  {
    id: "14",
    name: "Cycling",
    status: 85,
    image: cycle,
    lightColor: "#f8e4d9",
    color: "#fcf1ea",
    darkColor: "#fac5a4",
  },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 16,
  },
  box: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  value: {
    fontSize: 18,
    color: "#007bff",
  },
  cardsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
});

import React from "react";
import {
  View,
  Platform,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

interface PostProps {
  item: { key: string; photo: string; avatar_url: string };
  index: number;
  scrollX: any;
}

const Post: React.FC<PostProps> = ({ item, index, scrollX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-width * 0.7, 0, width * 0.7],
  });
  return (
    <View style={styles.container}>
      <View
        style={
          Platform.OS === "android" ? styles.androidStyle : styles.iosStyle
        }
      >
        <View style={styles.postView}>
          <Animated.Image
            source={{ uri: item.photo }}
            style={{ ...styles.postImage, transform: [{ translateX }] }}
          />
        </View>
        <Image source={{ uri: item.avatar_url }} style={styles.avatarImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iosStyle: {
    borderRadius: 18,
    borderWidth: 10,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    padding: 12,
    backgroundColor: "white",
  },
  androidStyle: {
    borderRadius: 18,
    elevation: 6,
    padding: 12,
    backgroundColor: "white",
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: "white",
    position: "absolute",
    bottom: -30,
    right: 60,
  },
  postImage: {
    width: ITEM_WIDTH * 1.5,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
  },
  postView: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: "hidden",
    alignItems: "center",
    borderRadius: 12,
  },
  container: { width, justifyContent: "center", alignItems: "center" },
});

export default Post;

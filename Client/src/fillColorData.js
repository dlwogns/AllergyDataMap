export const fillColorData = [
  "case",
  ["all", [">", ["get", "pm10value"], 0], ["<=", ["get", "pm10value"], 5]],
  "#FF0000", // Red
  ["all", [">", ["get", "pm10value"], 5], ["<=", ["get", "pm10value"], 10]],
  "#FF7F00", // Orange
  ["all", [">", ["get", "pm10value"], 10], ["<=", ["get", "pm10value"], 15]],
  "#FFFF00", // Yellow
  ["all", [">", ["get", "pm10value"], 15], ["<=", ["get", "pm10value"], 20]],
  "#00FF00", // Lime
  ["all", [">", ["get", "pm10value"], 20], ["<=", ["get", "pm10value"], 25]],
  "#0000FF", // Blue
  ["all", [">", ["get", "pm10value"], 25], ["<=", ["get", "pm10value"], 30]],
  "#8B00FF", // Violet
  ["all", [">", ["get", "pm10value"], 30], ["<=", ["get", "pm10value"], 35]],
  "#FFC0CB", // Pink
  ["all", [">", ["get", "pm10value"], 35], ["<=", ["get", "pm10value"], 40]],
  "#808080", // Gray
  ["all", [">", ["get", "pm10value"], 40], ["<=", ["get", "pm10value"], 45]],
  "#800000", // Maroon
  ["all", [">", ["get", "pm10value"], 45], ["<=", ["get", "pm10value"], 50]],
  "#808000", // Olive
  ["all", [">", ["get", "pm10value"], 50], ["<=", ["get", "pm10value"], 55]],
  "#008000", // Green
  ["all", [">", ["get", "pm10value"], 55], ["<=", ["get", "pm10value"], 60]],
  "#008080", // Teal
  ["all", [">", ["get", "pm10value"], 60], ["<=", ["get", "pm10value"], 65]],
  "#000080", // Navy
  ["all", [">", ["get", "pm10value"], 65], ["<=", ["get", "pm10value"], 70]],
  "#4B0082", // Indigo
  ["all", [">", ["get", "pm10value"], 70], ["<=", ["get", "pm10value"], 75]],
  "#7FFFD4", // Aquamarine
  ["all", [">", ["get", "pm10value"], 75], ["<=", ["get", "pm10value"], 80]],
  "#D2691E", // Chocolate
  ["all", [">", ["get", "pm10value"], 80], ["<=", ["get", "pm10value"], 85]],
  "#DC143C", // Crimson
  ["all", [">", ["get", "pm10value"], 85], ["<=", ["get", "pm10value"], 90]],
  "#BDB76B", // DarkKhaki
  [">", ["get", "pm10value"], 90],
  "#8B4513", // SaddleBrown
  "gray", // 기본 색상
];

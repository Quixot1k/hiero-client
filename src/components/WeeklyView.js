import React from "react";
import {View} from "react-native";
import {Calendar} from "react-native-calendars";
import {format} from "date-fns";

function WeeklyView() {
  return (
    <View>
      <Calendar
        // Initially visible month. Default = Date()
        current={format(new Date(), "yyyy-MM-dd")}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy-MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        // Mark dates
        markedDates={{
          "2023-05-18": {marked: true, dotColor: "#000"},
          "2023-05-19": {marked: true, dotColor: "#000"},
          "2023-05-20": {marked: true, dotColor: "#000"},
          // "2023-05-19": { disabled: true, disableTouchEvent: true },
        }}
        style={{
          width: 330,
          paddingBottom: 5,
        }}
        theme={{
          // header
          arrowColor: "#000",
          textMonthFontWeight: 500,
          monthTextColor: "#000",
          textDayHeaderFontWeight: 700,
          textSectionTitleColor: "#333",
          "stylesheet.calendar.header": {
            week: {
              marginTop: 4,
              flexDirection: "row",
              justifyContent: "space-between",
            },
          },
          // day
          textDayFontSize: 16,
          textDayFontWeight: 600,
          dayTextColor: "#333",
          selectedDayBackgroundColor: "#000",
          todayBackgroundColor: "#000",
          todayTextColor: "#fff",
          // week
          weekVerticalMargin: 1,
        }}
      />
    </View>
  );
}

export default WeeklyView;
